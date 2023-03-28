const axios = require("axios");
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
		// let newMessage = `Thank You.
		// Eastern Zonal Accountants Conference Expresses her gratitude to you for your participation at our conference, Awka 2023.
		// We wish you journey mercy as you return to your base.
		// Best regards`;

		return new Promise((resolve, reject) => {
			axios
				.get("https://portal.nigeriabulksms.com/api/", {
					params: {
						username: process.env.SMS_USERNAME,
						password: process.env.SMS_PASSWORD,
						message: message,
						sender: "ICAN",
						mobiles: to,
					},
				})
				.then((res) => {
					console.log(res.data);
					resolve(res.data);
				})
				.catch((err) => {
					console.log(err.message);
					reject(err);
				});
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
