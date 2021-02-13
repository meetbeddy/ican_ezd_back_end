const User = require("../models/User");
const Jimp = require("jimp");
const dot = require("dotenv");
const db = require("../config/db_connection");
const mail = require("../helpers/mailgun")

dot.config();
db();
const setUp = async () => {
    const cert = await Jimp.read("cert.jpg");
    const origImageDim = { width: cert.bitmap.width, height: cert.bitmap.height };
    cert.resize((origImageDim.width * 10 / 100), (origImageDim.height * 10 / 100)) // resize
        .quality(70)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    return {
        cert,
        font
    }
}
const nameFormatter = (name, memberAcronym) => {
    if (!name || !memberAcronym) return "";
    const surname = name.split(" ")[0] ? name.split(" ")[0].toUpperCase() : "";
    const firstName = name.split(" ")[1] ? name.split(" ")[1] : "";
    const otherName = name.split(" ")[2] ? name.split(" ")[2] : "";
    const acronym = memberAcronym.toUpperCase()
    return `${surname} ${firstName} ${otherName}, ${acronym}`
}

const printCert = async ({ cert, font, name, email }) => {
    cert.print(font, 130, 105, {
        text: name,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, 300, 202)
    // .write(`certs/${name}.png`);
    cert.getBase64(Jimp.MIME_PNG, function (err, data) {
        mail.sendCert(email, data, "ICAN CERTIFICATE OF PARTICIPATION", name)
    });
}
const genReceipt = async () => {
    try {
        const users = (await User.find({ confirmedPayment: true })).map(user => {
            const name = nameFormatter(user.name, user.memberAcronym);
            return { name, email: user.email };
        })
        users.forEach(async ({ name, email }) => {
            const { cert, font } = await setUp()
            printCert({ cert, font, name, email })
        })
    } catch (e) {
        console.log("🚀 ~ file: sendCert.js ~ line 32 ~ genReceipt ~ e", e);
    }
}

genReceipt();