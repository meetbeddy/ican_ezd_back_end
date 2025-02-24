const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validation = require("../../validation/general-validation");
const mail = require("../../helpers/mailgun");
const template = require("../../helpers/email.template");
const crypto = require("crypto");
const moment = require("moment");

//Models
const User = require("../../models/User");
const Token = require("../../models/Token");
const { upload } = require("../../configs/awsConfig");

/* POST route creates a user. */
router.post("/auth/signup", upload.single("file"), async (req, res, next) => {
	try {

		console.log(req.file)
		const { errors, isValid } = validation.register(req.body);
		if (!isValid) {
			// console.log(errors[Object.keys(errors)[0]]);
			return res.status(400).json({ message: errors[Object.keys(errors)[0]] });
		}
		const { memberCategory, nameOfSociety } = req.body;
		const existingUser = await User.findOne({ email: req.body.email });

		if (existingUser)
			return res
				.status(400)
				.json({ message: "user with this email already exist" });

		if (memberCategory === "half-paying member") {
			const halfPayingMembers = await User.find({
				nameOfSociety,
				memberCategory: "half-paying member",
			});
			if (halfPayingMembers.length >= 2)
				return res.status(400).json({
					message:
						"More than 2 members have registerd as half-paying members for this district society, please contact admin",
				});
		}
		const newUser = new User({
			...req.body,
			tellerDate: moment(req.body.tellerDate),
			role: { name: "User" },
			paymentProof: req.file ? req.file.location : null,
		});



		await newUser.save();



		return res.status(201).json({
			message: "User created sucessfully",
			success: true,
		});
	} catch (err) {
		res.status(500).json({ message: "something went wrong" });
	}
});

/* POST route Logs user in. */
router.post("/auth/signin", (req, res, next) => {
	const { errors, isValid } = validation.login(req.body);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then((user) => {
		// Check for user

		if (!user) {
			errors.email = "email or password not correct";
			return res.status(404).json(errors);
		}

		// Check Password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// User Matched
				const payload = {
					id: user.id,
				}; // Create JWT Payload

				// Sign Token
				jwt.sign(payload, process.env.secretOrKey, (err, token) => {
					res.json({
						success: true,
						token: "Bearer " + token,
					});
				});
			} else {
				errors.email = "email or password not correct";
				return res.status(400).json(errors);
			}
		});
	});
});

/*GET route of current user */

router.get("/auth/current/:id", (req, res, next) => {
	const { errors, isValid } = validation.getUser(req.params);
	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findById(req.params.id, { password: false, __v: false }).then((user) => {
		const userToSend = user;
		userToSend.password = "you are a fool";
		res.json(userToSend);
	});
	// res.json(req.body);
});

/*POST route of forgot password */

router.post("/auth/forgotpassword", async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(400).json({
				message: `we couldnt find a user with this email -${req.body.email}`,
			});
		}

		let token = await Token.findOne({ userId: user._Id });

		if (!token) {
			token = await new Token({
				userId: user._id,
				resetPasswordToken: crypto.randomBytes(20).toString("hex"),
			}).save();
		}

		const link = ` https://admin.icanezdconference.org.ng/passwordreset/?token=${token.resetPasswordToken}&id=${user._id}&email=${req.body.email}`;

		mail.sendMail(
			user.email,
			"PASSWORD RESET REQUEST",
			template.forgotpassword(user.name, user.email, link)
		);
		return res.status(200).json({
			message: `a link has been sent to your email -${req.body.email}`,
		});
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

router.get("/auth/checkresetlink/:token", async (req, res, next) => {
	try {
		let token = await Token.findOne({ resetPasswordToken: req.params.token });

		if (!token) {
			return res.status(400).json({
				message: "link expired or invalid",
			});
		}
		return res.status(200).json({ message: "valid" });
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
});

router.post("/auth/resetpassword", async (req, res, next) => {
	try {
		const user = await User.findOne({ _id: req.body.id });

		if (!user) return res.status(404).json({ message: "user does not exist" });

		if (req.body.password !== req.body.confirmPassword) {
			return res.status(404).json({ message: "password doesn't match" });
		}
		user.password = req.body.password;
		user.save();
		return res.status(200).json({ message: "password changed successfully" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "something went wrong", error: err.message });
	}
});
module.exports = router;
