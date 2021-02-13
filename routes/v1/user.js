const express = require("express");
const router = express.Router();
const userHelper = require("../../helpers/user");
const passport = require("passport");
const mail = require("../../helpers/mailgun");
const template = require("../../helpers/email.template");



router.get("/receipt", passport.authenticate("jwt", { session: false }), (req, res) => {
  userHelper.getReceipt(req.user).then(data => {
    res.json(data)
  }).catch(err => res.json(err))
});

router.get("/certificate",
  passport.authenticate("jwt", {session: false }), 
  (req, res) => {
    userHelper.getCertificate(req.user).then(data => {
      res.json(data);
    }).catch(err => {
    console.log("🚀 ~ file: user.js ~ line 22 ~ userHelper.getCertificate ~ err", err)
      res.status(s00).json(err)
    })
    

  });

module.exports = router