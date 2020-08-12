const express = require("express");
const router = express.Router();
const adminHelper = require("../../helpers/admin");
const passport = require("passport");

router.get("/all/users", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.getAllUsers().then(data => {
        res.json(data)
    }).catch(err => res.status(400).json(err))
});
router.put("/user/activate", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.activeUser(req.query.id).then(doc => {
        res.json(doc)
    }).catch(err => res.status(400).json(err))
});
router.put("/user/deactivate", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.dectiveUser(req.query.id).then(doc => {
        res.json(doc)
    }).catch(err => res.status(400).json(err))
});
router.put("/user/confirm/payment", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.comfirmPayment(req.query.id).then(doc => {
        res.json(doc)
    }).catch(err => res.status(400).json(err))
});

router.delete("/user/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.deleteUser(req.params.id).then(doc => {
        return res.json(doc)
    }).catch(err => res.status(400).json(err))
})
router.post("/user/update/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }

    adminHelper.updateUser(req.params.id, req.body).then(doc => {
        res.json(doc)
    }).catch(err => res.status(400).json(err))
})

router.get("/users/receipts", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }

    adminHelper.getUsersReceipts().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(400).json(err)
    })
});

router.post("/users/upload", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.uploadUsers(req.body).then(data => {
        res.json(data)
    }).catch(err => res.status(400).json(err))
})

router.post("/set_cert", passport.authenticate("jwt", {session: false}), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.certSetting(req.body).then(data => res.json(data)).catch(err => res.status(400).json(err))
})
router.post("/send_certificates", passport.authenticate("jwt", {session: false}), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.sendCertificate().then(data => res.json(data)).catch(err => res.status(400).json(err))
})

router.post("/send_sms", passport.authenticate("jwt", {session: false}), (req, res) => {
    if (req.user.role[0].name.toLowerCase() !== "admin") {
        return res.status(401).json({ message: "unauthorized" });
    }
    adminHelper.sendSMS(req.body.message).then(data => res.json(data)).catch(err => res.status(400).json(err))
})






module.exports = router