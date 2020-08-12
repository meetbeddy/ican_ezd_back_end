const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validation = require("../../validation/general-validation");
const moment = require("moment")
// const mail = require("../../helpers/mailgun");
// const sms = require("../../helpers/sms")
// const template = require("../../helpers/email.template");

//Models
const User = require("../../models/User");

/* POST route creates a user. */
router.post("/auth/signup", (req, res, next) => {
    const { errors, isValid } = validation.register(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res
                .status(400)
                .json({ email: "User with this email already exist" });
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password,
                bankName: req.body.bankName,
                tellerNumber: req.body.tellerNumber,
                tellerDate: moment(req.body.tellerDate),
                name: req.body.name,
                phone: req.body.phone,
                gender: req.body.gender,
                tshirtSize: req.body.tshirtSize,
                memberStatus: req.body.memberStatus,
                icanCode: req.body.icanCode,
                memberCategory: req.body.memberCategory,
                memberAcronym: req.body.memberAcronym,
                nameOfSociety: req.body.nameOfSociety,
                role: { name: "User" },
            });

            newUser.save().then(user => {
                res.json({
                    message: "User created sucessfully",
                    success: true
                });
            }).catch(err => {
                res.json(err)
            })
            // bcrypt.genSalt(10, (err, salt) => {
            //     bcrypt.hash(req.body.password, salt, (err, hash) => {
            //         if (err) throw err;
            //         newUser.password = hash;
            //         newUser
            //             .save()
            //             .then(user => {
            //                 sms.sendOne(req.body.phone, `Dear ${req.body.name}, You Have Successfully Registered for the 2020 ICAN Southern Conference. Here are your login details: Username: ${req.body.email}. password: ${req.body.password} `);
            //                 mail.SendMail(user.email, "SUCCESSFULL REGISTRATION", template.register(req.body.name, req.body.email, req.body.password));
            //                 const payload = {
            //                     id: user.id
            //                 };
            //                 res.json({
            //                     message: "User created sucessfully",
            //                     success: true
            //                 });
            //             })
            //             .catch(err => res.json(err));
            //     });
            // });
        }
    });
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
    User.findOne({ email }).then(user => {
        // Check for user
        if (!user) {
            errors.email = "email or password not correct";
            return res.status(404).json(errors);
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User Matched
                const payload = {
                    id: user.id
                }; // Create JWT Payload

                // Sign Token
                jwt.sign(payload, process.env.secretOrKey, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
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

    User.findById(req.params.id).then(user => {

        const userToSend = user;
        userToSend.password = "you are a fool";
        res.json(userToSend)
    });
    // res.json(req.body);
});
module.exports = router;