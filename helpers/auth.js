const bcrypt = require("bcryptjs");
const moment = require("moment");

const validation = require("../validation/general-validation");
const mail = require("../helpers/mailgun");
const template = require("../helpers/email.template");
const paymentHelper = require("../helpers/payment");
const sms = require("./sms");

const User = require("../models/User");
const Invoice = require("../models/Invoice");
const PRICE_CONFIG = require("../configs/priceConfig");

const EARLY_BIRD_DISCOUNT = 0.05;
const EARLY_BIRD_DEADLINE = "2025-12-31";

module.exports = {
    async singleSignUp(userData, file) {
        const { errors, isValid } = validation.register(userData);
        if (!isValid) {
            throw new Error(errors[Object.keys(errors)[0]]);
        }


        const { email, memberCategory, nameOfSociety = "", venue } = userData;

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.confirmedPayment) {
                throw new Error("User with this email already exists and is already confirmed");
            }
            // If user exists but is NOT confirmed, we allow updating their details
            // this effectively makes the signup idempotent for pending registrations
        }

        await this.enforceHalfPayingLimit(memberCategory, nameOfSociety, existingUser?._id);

        let finalAmount, baseAmount;
        let confirmedPayment;
        let role;

        if (userData.bulk) {
            finalAmount = userData.amount;
            baseAmount = userData.amount; // or 0, doesn't matter much for bulk
            confirmedPayment = userData.confirmedPayment;
            role = userData.role || [{ name: "User" }];
        } else {
            const amounts = this.calculateAmount(userData);
            baseAmount = amounts.baseAmount;
            finalAmount = amounts.finalAmount;

            confirmedPayment = await this.isConfirmedPayment(
                memberCategory,
                userData.tellerNumber
            );
            role = [{ name: "User" }];
        }


        const hashedPassword = await this.hashPassword(userData.password);

        let user;
        if (existingUser) {
            // Update existing unconfirmed user
            existingUser.set({
                ...userData,
                password: hashedPassword,
                tellerDate: userData.tellerDate ? moment(userData.tellerDate) : moment(),
                role,
                paymentProof: file?.location || existingUser.paymentProof || null,
                amount: finalAmount,
                confirmedPayment,
            });
            user = await existingUser.save();
        } else {
            // Create new user
            user = new User({
                ...userData,
                password: hashedPassword,
                tellerDate: userData.tellerDate ? moment(userData.tellerDate) : moment(),
                role,
                paymentProof: file?.location || null,
                amount: finalAmount,
                confirmedPayment,
            });
            await user.save();
        }

        await this.sendNotifications({
            user,
            rawPassword: userData.password,
            baseAmount,
            finalAmount,
            venue,
            confirmedPayment,
        });

        return user;
    },

    /* ---------------- HELPERS ---------------- */

    async enforceHalfPayingLimit(memberCategory, society, userId = null) {
        if (memberCategory !== "half-paying member") return;

        const query = {
            nameOfSociety: society,
            memberCategory: "half-paying member",
        };

        if (userId) {
            query._id = { $ne: userId };
        }

        const count = await User.countDocuments(query);

        if (count >= 2) {
            throw new Error(
                "Only 2 half-paying members are allowed per district society."
            );
        }
    },

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    },

    isEarlyBirdEligible() {
        return moment().isSameOrBefore(moment(EARLY_BIRD_DEADLINE).endOf("day"));
    },

    applyEarlyBirdDiscount(amount) {
        if (!this.isEarlyBirdEligible()) return amount;
        return Math.round(amount * (1 - EARLY_BIRD_DISCOUNT));
    },

    calculateAmount({ venue, memberStatus, memberCategory }) {
        venue = venue?.toLowerCase();
        memberStatus = memberStatus?.toLowerCase();
        memberCategory = memberCategory?.toLowerCase();

        let baseAmount =
            PRICE_CONFIG.special[memberCategory] ??
            PRICE_CONFIG[venue]?.[memberCategory] ??
            PRICE_CONFIG[venue]?.[memberStatus] ??
            PRICE_CONFIG.virtual?.default;

        if (!baseAmount) return {};

        const finalAmount = this.applyEarlyBirdDiscount(baseAmount);

        return { baseAmount, finalAmount };
    },

    async isConfirmedPayment(memberCategory, reference) {
        if (["admin", "planning"].includes(memberCategory?.toLowerCase())) {
            return true;
        }

        if (!reference) return false;

        try {
            const result = await paymentHelper.checkPaymentStatus(reference);
            return ["00", "01"].includes(result?.status) ||
                result?.message?.toLowerCase().includes("success");
        } catch {
            return false;
        }
    },

    async sendNotifications({
        user,
        rawPassword,
        baseAmount,
        finalAmount,
        venue,
        confirmedPayment,
    }) {
        const isDiscounted = baseAmount > finalAmount;
        const discountAmount = baseAmount - finalAmount;

        sms.sendOne(
            user.phone,
            `Dear ${user.name}, your registration for the 2026 ICAN Conference was successful.
Username: ${user.email}
Password: ${rawPassword}`
        );

        if (user.bulk) return;

        if (confirmedPayment) {
            await mail.sendMail(
                user.email,
                "SUCCESSFUL REGISTRATION",
                template.register(
                    user.name,
                    user.email,
                    rawPassword,
                    finalAmount,
                    isDiscounted,
                    discountAmount
                )
            );
        } else {
            await mail.sendMail(
                user.email,
                "PAYMENT INVOICE - ACTION REQUIRED",
                template.invoice(
                    user.name,
                    user.email,
                    user.tellerNumber, // This is the RRR
                    finalAmount,
                    isDiscounted,
                    discountAmount
                )
            );
        }

        if (!confirmedPayment) return;

        const invoice = await Invoice.create({
            user: user._id,
            amount: user.amount,
            invoiceId: Date.now().toString().slice(5),
            code: user.icanCode,
            name: user.name,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            shirtSize: user.tshirtSize,
            society: user.nameOfSociety,
        });

        await mail.sendMail(
            user.email,
            "PAYMENT CONFIRMED",
            template.sendReceipt(
                user.name,
                venue,
                invoice,
                isDiscounted,
                discountAmount
            )
        );
    },

    async updateRegistration(userData, file) {
        const { email } = userData;
        if (!email) throw new Error("Email is required for update");

        let user = await User.findOne({ email });
        if (!user) throw new Error("User not found");
        if (user.confirmedPayment) throw new Error("Registration already confirmed and cannot be updated");

        // Prepare update data - excluding sensitive fields like email/password unless explicitly handling them
        const updateData = { ...userData };
        delete updateData.email; // Don't allow email change via this endpoint

        if (userData.password) {
            updateData.password = await this.hashPassword(userData.password);
        } else {
            delete updateData.password;
        }

        if (userData.tellerDate) {
            updateData.tellerDate = moment(userData.tellerDate);
        }

        if (file) {
            updateData.paymentProof = file.location;
        }

        // Recalculate amounts if relevant fields changed
        if (userData.venue || userData.memberStatus || userData.memberCategory) {
            const amounts = this.calculateAmount({
                venue: userData.venue || user.venue,
                memberStatus: userData.memberStatus || user.memberStatus,
                memberCategory: userData.memberCategory || user.memberCategory
            });
            updateData.amount = amounts.finalAmount;
        }

        // Re-check payment status if tellerNumber changed
        if (userData.tellerNumber) {
            updateData.confirmedPayment = await this.isConfirmedPayment(
                userData.memberCategory || user.memberCategory,
                userData.tellerNumber
            );
        }

        user.set(updateData);
        await user.save();

        return user;
    },
};
