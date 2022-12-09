const mailgun = require("mailgun-js");
const dotenv = require("dotenv");
const MailComposer = require('nodemailer/lib/mail-composer');
const template = require("./email.template");
dotenv.config();
const mg = mailgun({ apiKey: process.env.MAIL_GUN_API_KEY, domain: process.env.DOMAIN });
module.exports = {
    sendMail: function (to, subject, text, image) {
        const data = {
            from: "ICAN <info@icaneasternzonalconference.org.ng>",
            to,
            subject,
            html: text
        };
        return new Promise((resolve, reject) => {
            mg.messages().send(data, function (error, body) {
                if (error) {
                    return reject(error)
                }
                resolve(data)
            })
        })
    },
    sendCert: function (to, base64, subject, name) {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                html: template.sendCert(name),
                to: to,
                from: "ICAN <info@icaneasternzonalconference.org.ng>",
                subject: subject,
                attachments: [
                    {
                        filename: name+'.png',
                        path: base64,
                        cid: 'cert' // cid must be equal to the one provided in html above
                    }
                ]
            };

            const mail = new MailComposer(mailOptions); // converting to MIME
            mail.compile().build((err, message) => {
                if (err) reject(err);
                const dataToSend = {
                    to: to,
                    message: message.toString('ascii'),
                };

                mg.messages().sendMime(dataToSend, (error, body) => {
                    if (error) reject(error);
                    resolve(body)
                });
            });
        })
    }
}