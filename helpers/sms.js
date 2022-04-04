const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  sendOne: function (to, message) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://portal.nigeriabulksms.com/api/?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_PASSWORD}&message=${message}&sender=ICAN&mobiles=${to}`
        )
        .then((res) => {
          resolve(res.date);
        })
        .catch((err) => reject(err));
    });
  },
  sendMany: function (to, message) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://portal.nigeriabulksms.com/api/?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_PASSWORD}&message=${message}&sender=ICAN&mobiles=${to}`
        )
        .then((res) => {
          resolve(res.date);
        })
        .catch((err) => reject(err));
    });
  },
  getballance: function () {
    return axios
      .get(
        `https://portal.nigeriabulksms.com/api/?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_PASSWORD}&action=balance`
      )
      .then((res) => res.data)
      .catch((err) => err.response);
  },
};
