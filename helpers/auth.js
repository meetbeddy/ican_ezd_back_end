const bcrypt = require("bcryptjs");
const validation = require("../validation/general-validation");
const mail = require("../helpers/mailgun");
const template = require("../helpers/email.template");
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
            const amount = this.calculateAmount(userData);
            const confirmedPayment = this.isConfirmedPayment(userData.memberCategory);

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            const newUser = new User({
                ...userData,
                password: hashedPassword,
                tellerDate: moment(userData.tellerDate),
                role: [{ name: "User" }],
                paymentProof: file ? file.location : null,
                amount,
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

            if (!newUser.bulk) {
                await mail.sendMail(
                    newUser.email,
                    "SUCCESSFUL REGISTRATION",
                    template.register(newUser.name, newUser.email, userData.password)
                );
            }

            return newUser;
        } catch (err) {
            throw err;
        }
    },

    calculateAmount: function ({ venue, memberStatus, memberCategory }) {
        venue = venue?.toLowerCase();
        memberStatus = memberStatus?.toLowerCase();
        memberCategory = memberCategory?.toLowerCase();

        if (PRICE_CONFIG.special[memberCategory] !== undefined) {
            return PRICE_CONFIG.special[memberCategory];
        }

        if (venue === "physical") {
            if (PRICE_CONFIG.physical[memberCategory])
                return PRICE_CONFIG.physical[memberCategory];
            if (PRICE_CONFIG.physical[memberStatus])
                return PRICE_CONFIG.physical[memberStatus];
        }

        if (venue === "virtual") {
            return PRICE_CONFIG.virtual.default;
        }

        return undefined;
    },

    isConfirmedPayment: function (memberCategory) {
        return ["admin", "planning"].includes(memberCategory?.toLowerCase());
    },
};
