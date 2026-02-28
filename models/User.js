const e = require("express");
const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;
// const bcrypt = require("bcryptjs");
// const mail = require("../helpers/mailgun");
// const sms = require("../helpers/sms");
// const template = require("../helpers/email.template");
// const Invoice = require("./Invoice");

// const roleSchema = mongooseSchema({
// 	name: { type: String, trim: true, required: true, default: "User" },
// });
// const userSchema = mongooseSchema(
// 	{
// 		role: [roleSchema],
// 		email: {
// 			type: String,
// 			trim: true,
// 			required: true,
// 			unique: true,
// 			index: true,
// 		},
// 		password: {
// 			type: String,
// 			trim: true,
// 			required: [true, "Please Insert a password"],
// 			min: [6, "Password Should Be greater than 6"],
// 		},
// 		bankName: { type: String, trim: true, required: true },
// 		tellerNumber: { type: String, trim: true, required: true },
// 		status: { type: String, trim: true, default: "active" },
// 		tellerDate: { type: Date, required: true },
// 		name: { type: String, trim: true, required: true },
// 		phone: { type: String, trim: true, required: true },
// 		gender: { type: String, trim: true, required: false },
// 		tshirtSize: {
// 			type: String,
// 			trim: true,

// 			default: function () {
// 				const venue = this.venue ? this.venue.toLowerCase() : "";
// 				if (venue === "virtual") return "NA";
// 				return this.tshirtSize;
// 			},
// 		},
// 		memberStatus: { type: String, trim: true, required: true },
// 		amount: {
// 			type: Number,
// 			trim: true,
// 			default: function () {
// 				const venue = this.venue ? this.venue.toLowerCase() : "";
// 				const memberStatus = this.memberStatus
// 					? this.memberStatus.toLowerCase()
// 					: "";
// 				if (memberStatus === "nonmember" && venue === "physical") return 60000;
// 				const memberCategory = this.memberCategory
// 					? this.memberCategory.toLowerCase()
// 					: "";
// 				if (memberCategory === "half-paying member") return 25000;
// 				if (memberCategory === "full-paying member" && venue === "physical")
// 					return 50000;
// 				if (memberCategory === "young-accountants" && venue === "physical")
// 					return 35000;
// 				if (venue === "virtual") return 30000;

// 				if (memberCategory === "admin" || memberCategory === "planning")
// 					return 0;
// 			},
// 		},
// 		confirmedPayment: {
// 			type: Boolean,
// 			required: true,
// 			default: function () {
// 				if (
// 					this.memberCategory.toLowerCase() === "admin" ||
// 					this.memberCategory.toLowerCase() === "planning"
// 				)
// 					return true;
// 				return false;
// 			},
// 		},
// 		icanCode: {
// 			type: String,
// 			trim: true,
// 			required: function () {
// 				return this.memberStatus.toLowerCase() === "member";
// 			},
// 		},
// 		memberCategory: {
// 			type: String,
// 			trim: true,
// 			required: function () {
// 				return this.memberStatus.toLowerCase() === "member";
// 			},
// 		},
// 		memberAcronym: {
// 			type: String,
// 			trim: true,
// 			required: function () {
// 				return this.memberStatus.toLowerCase() === "member";
// 			},
// 		},
// 		nameOfSociety: {
// 			type: String,
// 			trim: true,
// 			required: function () {
// 				return this.memberStatus.toLowerCase() === "member";
// 			},
// 		},
// 		venue: { type: String, trim: true, required: true },
// 		paymentProof: { type: String, trim: true },
// 	},
// 	{ timestamps: true }
// );

// userSchema.pre("save", function (next) {
// 	let user = this;
// 	bcrypt.genSalt(10, (err, salt) => {
// 		if (err) return next(err);
// 		bcrypt.hash(user.password, salt, (err, hash) => {
// 			if (err) return next(err);

// 			sms.sendOne(
// 				user.phone,
// 				`Dear ${user.name}, You Have Successfully Registered for the 2026 ICAN Ican Conference. Here are your login details: Username: ${user.email}. password: ${user.password} `
// 			);
// 			if (!user.bulk) {
// 				mail.sendMail(
// 					user.email,
// 					"SUCCESSFULL REGISTRATION",
// 					template.register(user.name, user.email, user.password)
// 				);
// 				user.password = hash;
// 			}
// 			next();
// 		});
// 	});
// });
// module.exports = User = mongoose.model("user", userSchema);


const roleSchema = mongooseSchema({
	name: { type: String, trim: true, required: true, default: "User" },
});

const userSchema = mongooseSchema(
	{
		role: [roleSchema],
		email: { type: String, trim: true, required: true, unique: true, index: true },
		password: { type: String, trim: true, required: true, minlength: 6 },
		name: { type: String, trim: true, required: true },
		phone: { type: String, trim: true, required: true },
		gender: { type: String, trim: true, enums: ["male", "female", "other"] },
		bankName: { type: String, trim: true, required: true },
		tellerNumber: { type: String, trim: true, required: true },
		tellerDate: { type: Date, required: true },
		status: { type: String, trim: true, default: "active", enums: ["active", "inactive"] },
		venue: { type: String, trim: true, required: true },
		memberStatus: { type: String, trim: true, required: true, enums: ["member", "nonmember"] },
		memberCategory: { type: String, trim: true, enums: ["admin", "planning", "full-paying member", "half-paying member", "young-accountants", "nonmember"] },
		memberAcronym: { type: String, trim: true, enums: ["ACA", "FCA"] },
		nameOfSociety: { type: String, trim: true },
		icanCode: { type: String, trim: true },
		tshirtSize: {
			type: String,
			trim: true,
			default: function () {
				const venue = this.venue?.toLowerCase();
				return venue === "virtual" ? "NA" : this.tshirtSize;
			},
		},
		amount: { type: Number, trim: true },
		confirmedPayment: { type: Boolean, required: true, default: false },
		paymentProof: { type: String, trim: true },
	},
	{ timestamps: true }
);

module.exports = User = mongoose.model("user", userSchema);
