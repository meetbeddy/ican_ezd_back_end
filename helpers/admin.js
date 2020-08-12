const User = require("../models/User");
const Invoice = require("../models/Invoice");
const Settings = require("../models/Settings");
const sms = require("./sms");
const email = require("./email.template");
const mail = require("./mailgun");
const Jimp = require("jimp");


module.exports = {
    usersProjection: {
        __v: false,
        password: false,
    },
    getAllUsers: function () {
        return new Promise((resolve, reject) => {
            User.find({}, this.usersProjection).then(data => {
                let users = data.filter(user => user.role[0].name.toLowerCase() !== "admin");
                resolve(users)
            }).catch(err => {
                reject(err)
            })
        })
    },
    activeUser: function (email) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ email }, { status: "active" })
                .then(user => {
                    resolve(user)
                }).catch(err => reject(err))
        })
    },
    dectiveUser: function (email) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ email }, { status: "not active" })
                .then(user => {
                    resolve(user)
                }).catch(err => reject(err))
        })
    },
    comfirmPayment: function (id) {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate({ _id: id }, { confirmedPayment: true }, this.usersProjection).then(user => {
                if (!user) {
                    reject({ message: "No User Found" });
                    return;
                }
                const invoice = new Invoice({
                    user: user._id,
                    amount: user.amount,
                    invoiceId: new Date().getTime().toString().slice(5),
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    gender: user.gender,
                    shirtSize: user.tshirtSize,
                    society: user.nameOfSociety,
                });

                sms.sendOne(user.phone, `Dear ${user.name}, your Payment for ICAN 2020 Conference has been confirmed.`);

                // email.confirmPayent();


                invoice.save().then().catch(err =>
                    err
                )
                resolve(user)
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteUser: function (id) {
        return new Promise((resolve, reject) => {
            User.findByIdAndDelete(id).then(doc => {
                Invoice.findOneAndDelete({ user: doc._id }).then(data => {
                }).catch(err => err)
                resolve(doc)
            }).catch(err => reject(err))
        })
    },
    updateUser: function (id, data) {
        return new Promise((resolve, reject) => {
            if (!data.password) {
                User.findOneAndUpdate({ email: data.email }, { email: data.email, name: data.name, gender: data.gender, icanCode: data.icanCode, memberAcronym: data.memberAcronym, memberCategory: data.memberCategory, amount: data.amount, memberStatus: data.memberStatus, nameOfSociety: data.nameOfSociety, tellerNumber: data.tellerNumber, tshirtSize: data.tshirtSize, bankName: data.bankName }, { useFindAndModify: false }).then(doc => {
                    resolve(doc);
                }).catch(err => reject(err))
            } else {
                User.findById(id).then(doc => {
                    doc.email = data.email;
                    doc.name = data.name;
                    doc.gender = data.gender;
                    doc.icanCode = data.icanCode;
                    doc.memberAcronym = data.memberAcronym;
                    doc.memberCategory = data.memberCategory;
                    doc.amount = data.amount;
                    doc.memberStatus = data.memberStatus;
                    doc.nameOfSociety = data.nameOfSociety;
                    doc.tellerNumber = data.tellerNumber;
                    doc.password = data.password;
                    doc.tshirtSize = data.tshirtSize;
                    doc.bankName = data.bankName;
                    doc.save().catch(err => err)
                    resolve(doc)
                }).catch(err => reject(err))
            }
        })
    },
    uploadUsers: function (data) {
        return new Promise((resolve, reject) => {
            let users = data.map(value => {
                if (value.confirmedPayment.toLowerCase() === "true") {
                    value.confirmedPayment = true
                } else {
                    value.confirmedPayment = false
                }
                value.role = [{ name: value.role }]
                return value
            });
            User.create(users).then(users => {
                // SEND Email and SMS
                resolve(users)
            }).catch(err => reject(err))
        })
    },
    getUsersReceipts: function () {
        return new Promise((resolve, reject) => {
            Invoice.find({}).then(receipts => {
                resolve(receipts)
            }).catch(err => reject(err))
        })
    },
    certSetting: function (cert) {
        return new Promise((resolve, reject) => {
            Settings.findOneAndUpdate({}, { certificate: cert.cert }, { useFindAndModify: false }).then(data => resolve(data)).catch(err => reject(err))
        })
    },
    sendCertificate: async function () {
        let setting = await Setting.findOne().then(data => data).catch(err => err);
        let users = await this.getAllUsers();
        users = users.filter(user => user.confirmedPayment);
        return new Promise((resolve, reject) => {
            if (!setting.certificate) {
                resolve("PLEASE CLICK THE \'START CERTIFICATE DISTRIBUTION\' BUTTON TO SET CERTIFICATE TRUE")
            }
            users.map(user => {
                let cert;
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
                        mail.sendCert(user.email, data, "ICAN CERTIFICATE OF PARTICIPATION", user.name).then(success => {
                            console.log("success")
                        }).catch(err => console.log(err))
                    });
                }).catch(function (err) {
                    reject(err)
                });
            });
            resolve(users)
        })
    },
    sendSMS: async function (message) {
        let users = await this.getAllUsers();
        let usersPhone = await users.map(user => user.phone);
        return new Promise((resolve, reject) => {
            let dataToSend = usersPhone.join(",");
            sms.sendMany(dataToSend, message).then(() => resolve(users.length)).catch(err => reject(err))
        })
    }
}