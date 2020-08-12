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
      // mail.sendCert("arinzeogbo@gmail.com", data, "ICAN CERTIFICATE OF PARTICIPATION", req.user.name).then(success => {
      //   console.log("success")
    // }).catch(err => console.log(err))
    }).catch(err => {
      res.status(400).json(err)
    })
    

  });

module.exports = router