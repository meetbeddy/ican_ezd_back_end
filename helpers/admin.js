const User = require("../models/User");
const Invoice = require("../models/Invoice");
const Settings = require("../models/Settings");
const sms = require("./sms");
const email = require("./email.template");
const mail = require("./mailgun");
const Jimp = require("jimp");
const escapeRegex = require("./searchRegex")
const moment = require("moment");


module.exports = {
    usersProjection: {
        __v: false,
        password: false,
    },
    paginated: function (query, data, model) {
        return async (req, res, next) => {
            if (req.user.role[0].name.toLowerCase() !== "admin") {
                return res.status(401).json({ message: "unauthorized" });
            }
            if (req.query.search) {
                regex = new RegExp(escapeRegex(req.query.search), 'gi');
                const result = {}
                query.name = regex;
                result.page = parseInt(req.query.page) || 1;
                result.count = await await model.countDocuments(query);
                try {
                    result.data = await model.find(query, data).limit(parseInt(req.query.size || 10)).skip(((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.size) || 10)).exec();
                    req.result = result
                    next()
                } catch (e) {
                    res.status(400).json({ message: e.message })
                }
                next()
            }
            const result = {}
            result.page = parseInt(req.query.page) || 1;
            result.count = await await model.countDocuments(query);
            try {
                result.data = await model.find(query, data).limit(parseInt(req.query.size || 10)).skip(((parseInt(req.query.page) || 1) - 1) * (parseInt(req.query.size) || 10)).exec();
                req.result = result
                next()
            } catch (e) {
                res.status(400).json({ message: e.message })
            }
            next()
        }
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
    activeUser: function (id) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ _id: id }, { status: "active" }, { useFindAndModify: false })
                .then(user => {
                    resolve(user)
                }).catch(err => reject(err))
        })
    },
    dectiveUser: function (id) {
        return new Promise((resolve, reject) => {
            User.findOneAndUpdate({ _id: id }, { status: "banned" }, { useFindAndModify: false })
                .then(user => {
                    resolve({ message: "success", error: null })
                }).catch(err => reject(err))
        })
    },
    comfirmPayment: function (id) {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate({ _id: id }, { confirmedPayment: true }, { useFindAndModify: false }).then(user => {
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
                invoice.save().then(value => {
                    sms.sendOne(user.phone, `Dear ${user.name}, your Payment for ICAN 2020 Conference has been confirmed.`);
                    resolve(user)
                }).catch(err => reject(err))
            }).catch(err => {
                console.log(err)
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
            User.findOneAndUpdate({ _id: id }, { email: data.email, name: data.name, gender: data.gender, icanCode: data.icanCode, memberAcronym: data.memberAcronym, memberCategory: data.memberCategory, amount: data.amount, memberStatus: data.memberStatus, nameOfSociety: data.nameOfSociety, tellerNumber: data.tellerNumber, tshirtSize: data.tshirtSize, bankName: data.bankName, phone: data.phone }, { useFindAndModify: false }).then(doc => {
                resolve(doc);
            }).catch(err => reject(err))
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
                value.tellerDate = moment().format()
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
    },
    getStats: async function (req, res, next) {
        const stats = {}
        const society = {};
        const shirtSize = {}
        const { balance } = await sms.getballance();
        const users = await User.find();
        const active = users.filter(value => value.status === "active");
        const banned = users.filter(value => value.status === "banned");
        const confirmed = users.filter(value => value.confirmedPayment);
        const unConfirmed = users.filter(value => !value.confirmedPayment);
        const fullPaymingMembers = confirmed.filter(value => value.memberCategory.toLowerCase().includes("full-paying") && value.memberStatus.toLowerCase() === "member");
        const fullPaymingMembersTotal = fullPaymingMembers.reduce((acc, cur) => acc + cur.amount, 0);
        const halfPaymingMembers = confirmed.filter(value => value.memberCategory.toLowerCase().includes("half-paying") && value.memberStatus.toLowerCase() === "member");
        const halfPaymingMembersTotal = halfPaymingMembers.reduce((acc, cur) => acc + cur.amount, 0)
        const nonMembers = users.filter(value => value.memberStatus.toLowerCase() === "nonmember");
        const nonMembersTotal = nonMembers.reduce((acc, cur) => acc + cur.amount, 0);

        users.forEach(user => {
            society[user.nameOfSociety] = society[user.nameOfSociety] ? [...society[user.nameOfSociety], user] : [user];
            shirtSize[user.tshirtSize] = shirtSize[user.tshirtSize] ? [...shirtSize[user.tshirtSize], user] : [user];

        })
        stats.registered = users.length;
        stats.active = active.length;
        stats.banned = banned.length;
        stats.confirmed = confirmed.length;
        stats.unConfirmed = unConfirmed.length;
        stats.fullPaymingMembers = { numbers: fullPaymingMembers.length, amount: fullPaymingMembersTotal };
        stats.halfPaymingMembers = { numbers: halfPaymingMembers.length, amount: halfPaymingMembersTotal };
        stats.nonMembers = { numbers: nonMembers.length, amount: nonMembersTotal };
        stats.society = society;
        stats.shirtSize = shirtSize;
        stats.balance = balance;

        res.json(stats)
    }
}