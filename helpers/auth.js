const bcrypt = require("bcryptjs");
const validation = require("../validation/general-validation");
const mail = require("../helpers/mailgun");
const template = require("../helpers/email.template");
const paymentHelper = require("../helpers/payment");
const moment = require("moment");
const User = require("../models/User");
const PRICE_CONFIG = require("../configs/priceConfig");
const sms = require("./sms");

module.exports = {
    singleSignUp: async function (userData, file) {
        try {
            const { errors, isValid } = validation.register(userData);
            if (!isValid) {
                const message = errors[Object.keys(errors)[0]];
                throw new Error(message);
            }

            const { email, memberCategory, nameOfSociety } = userData;

            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error("User with this email already exists");

            // Restrict half-paying members
            if (memberCategory === "half-paying member") {
                const count = await User.countDocuments({
                    nameOfSociety,
                    memberCategory: "half-paying member",
                });
                if (count >= 2) {
                    throw new Error(
                        "More than 2 members have registered as half-paying members for this district society. Please contact admin."
                    );
                }
            }

            // Compute fields
            const { baseAmount, finalAmount } = this.calculateAmount(userData);
            const confirmedPayment = await this.isConfirmedPayment(userData.memberCategory, userData.tellerNumber);

            console.log("confirmedPayment", confirmedPayment);

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            const newUser = new User({
                ...userData,
                password: hashedPassword,
                tellerDate: moment(userData.tellerDate),
                role: [{ name: "User" }],
                paymentProof: file ? file.location : null,
                amount: finalAmount,
                confirmedPayment,
            });

            await newUser.save();

            // Send notifications
            sms.sendOne(
                newUser.phone,
                `Dear ${newUser.name}, You have successfully registered for the 2025 ICAN Conference.
        Here are your login details:
        Username: ${newUser.email}
        Password: ${userData.password}`
            );

            const isDiscounted = baseAmount && finalAmount && baseAmount !== finalAmount;
            const discountAmount = isDiscounted ? baseAmount - finalAmount : 0;

            if (!newUser.bulk) {
                await mail.sendMail(
                    newUser.email,
                    "SUCCESSFUL REGISTRATION",
                    template.register(newUser.name, newUser.email, userData.password, finalAmount, isDiscounted, discountAmount)
                );
            }

            return newUser;
        } catch (err) {
            throw err;
        }
    },

    /**
     * Check if registration qualifies for early bird discount
     * Returns true if current date is on or before December 31, 2025
     */
    isEarlyBirdEligible: function () {
        const now = moment();
        const deadline = moment("2025-12-31").endOf("day");
        return now.isSameOrBefore(deadline);
    },

    /**
     * Apply early bird discount to amount
     * Returns discounted amount if eligible, otherwise returns original amount
     */
    applyEarlyBirdDiscount: function (baseAmount) {
        if (!baseAmount || baseAmount <= 0) return baseAmount;

        const isEligible = this.isEarlyBirdEligible();
        if (!isEligible) return baseAmount;

        // Apply 5% discount
        const discountPercentage = 0.05;
        const discountedAmount = Math.round(baseAmount * (1 - discountPercentage));

        console.log(`Early bird discount applied: ₦${baseAmount} -> ₦${discountedAmount} (saved ₦${baseAmount - discountedAmount})`);

        return discountedAmount;
    },

    calculateAmount: function ({ venue, memberStatus, memberCategory }) {
        venue = venue?.toLowerCase();
        memberStatus = memberStatus?.toLowerCase();
        memberCategory = memberCategory?.toLowerCase();

        let baseAmount;

        // Check special categories first
        if (PRICE_CONFIG.special[memberCategory] !== undefined) {
            baseAmount = PRICE_CONFIG.special[memberCategory];
        }
        // Check physical venue pricing
        else if (venue === "physical") {
            if (PRICE_CONFIG.physical[memberCategory]) {
                baseAmount = PRICE_CONFIG.physical[memberCategory];
            } else if (PRICE_CONFIG.physical[memberStatus]) {
                baseAmount = PRICE_CONFIG.physical[memberStatus];
            }
        }
        // Check virtual venue pricing
        else if (venue === "virtual") {
            baseAmount = PRICE_CONFIG.virtual.default;
        }

        // If no base amount found, return undefined
        if (baseAmount === undefined) {
            return undefined;
        }

        // Apply early bird discount if eligible
        const finalAmount = this.applyEarlyBirdDiscount(baseAmount);

        return { finalAmount, baseAmount };
    },

    isConfirmedPayment: async function (memberCategory, reference) {
        const category = memberCategory?.toLowerCase();

        // Auto-confirm for special categories
        if (["admin", "planning"].includes(category)) {
            return true;
        }

        // For all others, verify RRR—but don't allow errors to break registration
        if (!reference) return false;

        try {
            const result = await paymentHelper.checkPaymentStatus(reference);

            console.log("result", result);

            if (
                result &&
                (result.status === "00" ||
                    result.status === "01" ||
                    result.message?.toLowerCase().includes("success"))
            ) {
                return true;
            }

            return false;
        } catch (err) {
            console.log("RRR verification error:", err.message);
            return false;
        }
    },

};