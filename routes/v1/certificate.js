const Jimp = require("jimp");
const express = require("express");
const router = express.Router();
// const adminHelper = require("../../helpers/admin");
const passport = require("passport");

// let cert;
router.get("/all", 
passport.authenticate("jwt", {session: false }), 
(req, res) => {

    Jimp.read("../../certs/cert.jpg").then(function(image) {
        cert = image;
        return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    }).then(function (font) {
        cert.print(font, 5, 0, {
            text: 'Hello world!',
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
          }, 775, 775)
        cert.print(font, 50, 50, "image Caption")
                   .write("../../certs/new_cert.png");
    }).catch(function (err) {
        console.error(err);
    });
  
});

module.exports = router;