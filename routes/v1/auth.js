const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validation = require("../../validation/general-validation");
const moment = require("moment")

//Models
const User = require("../../models/User");

/* POST route creates a user. */
router.post("/auth/signup", async (req, res, next) => {
    const { errors, isValid } = validation.register(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(async user => {
        const { memberCategory, nameOfSociety } = req.body;
        if (user) return res
            .status(400)
            .json({ email: "User with this email already exist" });
        if (memberCategory === "half-paying member") {
            const halfPayingMembers = await User.find({ nameOfSociety, memberCategory: "half-paying member" });
            if (halfPayingMembers.length >= 2) return res.status(400).json({ memberCategory: "More than 2 members have registerd as half-paying members for this district society, please contact admin" })
        }
        const newUser = new User({
            ...req.body,
            tellerDate: moment(req.body.tellerDate),
            role: { name: "User" },
        });
        try {
            await newUser.save();
            return res.json({
                message: "User created sucessfully",
                success: true
            })
        } catch (e) {
            return res.status(400).json(e.message);
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

    User.findById(req.params.id, { password: false, __v: false }).then(user => {

        const userToSend = user;
        userToSend.password = "you are a fool";
        res.json(userToSend)
    });
    // res.json(req.body);
});
module.exports = router;