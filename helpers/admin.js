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
            if (req.query.page) {
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
            const result = {}
            result.count = await await model.countDocuments(query);
            try {
                result.data = await model.find(query, data);
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
                    sms.sendOne(user.phone, `Dear ${user.name}, your payment for ICAN 2021 Conference has been confirmed, please login to your profile to print your receipt. Thanks`);
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
        // console.log("🚀 ~ file: admin.js ~ line 133 ~ data", data)
        return new Promise((resolve, reject) => {
            let users = data.map(value => {
                if (value.confirmedPayment) {
                    value.confirmedPayment = true
                } else {
                    value.confirmedPayment = false
                }
                value.tellerDate = moment().format()
                value.role = [{ name: value.role }]
                return value
            });
            User.create(users).then(users => {
                users.forEach(user => {
                        // sms.sendOne(user.phone, `Dear ${user.name}, You Have Successfully Registered for the 2021 ICAN Eastern Conference. Here are your login details: Username: ${user.email}. password: ${user.password} `);
                        // mail.sendMail(user.email, "SUCCESSFULL REGISTRATION", email.register(user.name, user.email, user.password));
                });
                resolve(users)
            }).catch(err => {
                console.log("err", err)
                reject(err)
            })
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
                    return Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
                }).then(function (font) {
                    let surname = user.name.split(" ")[0] ? user.name.split(" ")[0].toUpperCase() : "";
                    let firstName = user.name.split(" ")[1] ? user.name.split(" ")[1] : "";
                    let otherName = user.name.split(" ")[2] ? user.name.split(" ")[2] : "";
                    let memberAcronym = user.memberAcronym.toUpperCase();
                    cert.print(font, 1500, 1650, {
                        text: `${surname} ${firstName} ${otherName}, ${memberAcronym}`,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                    }, 2000, 900)
                    // .write(`certs/${user.name}.png`);
                    // console.log("Helo")
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
        try {

            const stats = {}
            const society = {};
            const shirtSize = {}
            const { balance } = await sms.getballance();
            let users = await User.find();
            const invoice = await Invoice.find({ scanned: true });
            users = users.filter(value => value.memberCategory && value.memberCategory.toLowerCase() !== "admin");
            const active = users.filter(value => value.status === "active");
            const banned = users.filter(value => value.status === "banned");
            const physical = users.filter(value => value.venue.toLowerCase() === "physical");
            const virtual = users.filter(value => value.venue.toLowerCase() === "virtual");
            const confirmed = users.filter(value => value.confirmedPayment);
            const unConfirmed = users.filter(value => !value.confirmedPayment);
            const fullPaymingMembers = confirmed.filter(value => (value.memberCategory.toLowerCase().includes("full-paying member") || value.memberCategory.toLowerCase().includes("full paying")) && value.memberStatus.toLowerCase() === "member");
            const fullPaymingMembersTotal = fullPaymingMembers.reduce((acc, cur) => acc + cur.amount, 0);
            const halfPaymingMembers = confirmed.filter(value => (value.memberCategory.toLowerCase().includes("half-paying member") || value.memberCategory.toLowerCase().includes("half paying")) && value.memberStatus.toLowerCase() === "member");
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
            stats.physical = physical.length;
            stats.virtual = virtual.length;
            stats.attended = invoice.length;

            res.json(stats)
        } catch (e) {
            console.log("🚀 ~ file: admin.js ~ line 260 ~ e", e)
            res.status(400).json(e)
        }
    },
    markAttendance: async function (req, res, next) {
        const { search } = req.body;

        try {
            const invoice = await Invoice.findOne({ invoiceId: search });
            if (!invoice) return res.status(400).json({ message: "User not found", success: false });
            if (invoice.scanned) return res.status(200).json({ success: true, message: `${invoice.name} have been admitted` });
            await Invoice.findByIdAndUpdate({ _id: invoice._id }, { scanned: true }, { useFindAndModify: false });
            return res.json({ success: true, message: "Attendance taken successfully" })
        } catch (e) {
            res.status(500).json({ success: false, message: e.message })
        }
    }
}