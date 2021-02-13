const User = require("../models/User");
const Jimp = require("jimp");
const dot = require("dotenv");
const db = require("../config/db_connection");

dot.config();
db();
// const user = {
//     name: "Arinze Ogbonna Ugabla",
//     memberAcronym: "ACA",
// }
const genReceipt = async () => {
    try {
        console.log("I got here")
        const users = (await User.find({ confirmedPayment: true })).map(user => {
            const surname = user.name.split(" ")[0] ? user.name.split(" ")[0].toUpperCase() : "";
            const firstName = user.name.split(" ")[1] ? user.name.split(" ")[1] : "";
            const otherName = user.name.split(" ")[2] ? user.name.split(" ")[2] : "";
            const memberAcronym = user.memberAcronym.toUpperCase()
            return `${surname} ${firstName} ${otherName}, ${memberAcronym}`;
        })
        
        console.log("🚀 ~ file: sendCert.js ~ line 19 ~ users ~ users", users)
    //     const value = await Jimp.read("cert.jpg");
    //     const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
    //     let surname = user.name.split(" ")[0] ? user.name.split(" ")[0].toUpperCase() : "";
    //     let firstName = user.name.split(" ")[1] ? user.name.split(" ")[1] : "";
    //     let otherName = user.name.split(" ")[2] ? user.name.split(" ")[2] : "";
    //     let memberAcronym = user.memberAcronym.toUpperCase();
    //     value.print(font, 1560, 1650, {
    //         text: `${surname} ${firstName} ${otherName}, ${memberAcronym}`,
    //         alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    //         alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    //     }, 2000, 900)
    //         .write(`certs/${user.name}.png`);
    } catch (e) {
        console.log("🚀 ~ file: sendCert.js ~ line 32 ~ genReceipt ~ e", e);
    }
}

genReceipt();
// Jimp.read("cert.jpg").then(function (image) {
//     cert = image;
//     return Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
// }).then(function (font) {
//     let surname = user.name.split(" ")[0] ? user.name.split(" ")[0].toUpperCase() : "";
//     let firstName = user.name.split(" ")[1] ? user.name.split(" ")[1] : "";
//     let otherName = user.name.split(" ")[2] ? user.name.split(" ")[2] : "";
//     let memberAcronym = user.memberAcronym.toUpperCase();
//     cert.print(font, 1560, 1650, {
//         text: `${surname} ${firstName} ${otherName}, ${memberAcronym}`,
//         alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
//         alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
//     }, 2000, 900)
//     .write(`certs/${user.name}.png`);
//     console.log("Helo")
//     // cert.getBase64(Jimp.MIME_PNG, function (err, data) {
//     //     mail.sendCert(user.email, data, "ICAN CERTIFICATE OF PARTICIPATION", user.name).then(success => {
//     //         console.log("success")
//     //     }).catch(err => console.log(err))
//     // });
// }).catch(function (err) {
//     console.log(err)
// });