const Receipt = require("../models/Invoice");
const Setting = require("../models/Settings");
const Jimp = require("jimp");

module.exports = {
    usersProjection: {
        __v: false,
        password: false,
    },
    getReceipt: function (user) {
        return new Promise((resolve, reject) => {
            Receipt.findOne({ user: user._id }).then(data => {
                if (data) {
                    resolve(data);
                } else {
                    resolve(null)
                }
            }
            ).then(err => reject(err))
        })
    },
    getCertificate: async function (user) {
        let cert;
        let setting = await Setting.findOne().then(data => data).catch(err => err);
        return new Promise((resolve, reject) => {
            if (!setting.certificate) {
                resolve("NO CERTIFICATE AVAILABLE FOR YOU NOW")
            }
            Jimp.read("cert.jpg").then(function (image) {
                cert = image;
                return Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
            }).then(function (font) {
                let surname = user.name.split(" ")[0] ? user.name.split(" ")[0].toUpperCase() : "";
                let firstName = user.name.split(" ")[1] ? user.name.split(" ")[1] : "";
                let otherName = user.name.split(" ")[2] ? user.name.split(" ")[2] : "";
                let memberAcronym = user.memberAcronym.toUpperCase();
                cert.print(font, 5, -62, {
                    text: `${surname} ${firstName} ${otherName}, ${memberAcronym}`,
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                }, 775, 775)
                // .write(`certs/${user.name}.png`);

                cert.getBase64(Jimp.MIME_PNG, function (err, data) {
                    resolve(data)
                });
            }).catch(function (err) {
                reject(err)
                // console.error(err);
            });
        })
    }

}