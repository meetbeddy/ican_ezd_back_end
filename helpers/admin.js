const User = require("../models/User");
const Invoice = require("../models/Invoice");
const Settings = require("../models/Settings");
const sms = require("./sms");
const email = require("./email.template");
const mail = require("./mailgun");
const Jimp = require("jimp");
const escapeRegex = require("./searchRegex");
const moment = require("moment");
const cert = require("./sendCert");
const user = require("./user");
const validation = require("../validation/general-validation");
const File = require("../models/Papers");
const aws = require("aws-sdk");
const fs = require("fs");
const { stat } = require("fs/promises");
const { error } = require("console");
const mailgun = require("./mailgun");

s3 = new aws.S3({
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	},
	Bucket: "imt-class",
	apiVersion: "latest",
});
module.exports = {
	usersProjection: {
		__v: false,
		password: false,
	},
	paginated: async function (req, query, data, model) {
		if (req.query.search && req.query.search.trim()) {
			regex = new RegExp(escapeRegex(req.query.search), "gi");
			const result = {};
			query.name = regex;
			result.page = parseInt(req.query.page) || 1;
			result.count = await model.countDocuments(query);
			try {
				result.data = await model
					.find(query, data)
					.limit(parseInt(req.query.size || 10))
					.skip(
						((parseInt(req.query.page) || 1) - 1) *
						(parseInt(req.query.size) || 10)
					)
					.exec();

				return result;
			} catch (e) {
				throw new Error(e);
				// return res.status(400).json({ message: e.message });
			}
		}

		if (req.query.page) {
			const result = {};
			result.page = parseInt(req.query.page) || 1;
			result.count = await await model.countDocuments(query);
			try {
				result.data = await model
					.find(query, data)
					.limit(parseInt(req.query.size || 10))
					.skip(
						((parseInt(req.query.page) || 1) - 1) *
						(parseInt(req.query.size) || 10)
					)
					.exec();

				return result;
			} catch (e) {
				throw new Error(e);
			}
		}
		const result = {};
		result.count = await await model.countDocuments(query);
		try {
			result.data = await model.find(query, data);

			return result;
		} catch (e) {
			throw new Error(e);
		}
		// return async (req, res, next) => {
		// 	if (req.user.role[0].name.toLowerCase() !== "admin") {
		// 		return res.status(401).json({ message: "unauthorized" });
		// 	}
		// 	if (req.query.search && req.query.search.trim()) {
		// 		regex = new RegExp(escapeRegex(req.query.search), "gi");
		// 		const result = {};
		// 		query.name = regex;
		// 		result.page = parseInt(req.query.page) || 1;
		// 		result.count = await model.countDocuments(query);
		// 		try {
		// 			result.data = await model
		// 				.find(query, data)
		// 				.limit(parseInt(req.query.size || 10))
		// 				.skip(
		// 					((parseInt(req.query.page) || 1) - 1) *
		// 						(parseInt(req.query.size) || 10)
		// 				)
		// 				.exec();
		// 			req.result = result;
		// 			next();
		// 		} catch (e) {
		// 			return res.status(400).json({ message: e.message });
		// 		}
		// 		return next();
		// 	}
		// 	if (req.query.page) {
		// 		const result = {};
		// 		result.page = parseInt(req.query.page) || 1;
		// 		result.count = await await model.countDocuments(query);
		// 		try {
		// 			result.data = await model
		// 				.find(query, data)
		// 				.limit(parseInt(req.query.size || 10))
		// 				.skip(
		// 					((parseInt(req.query.page) || 1) - 1) *
		// 						(parseInt(req.query.size) || 10)
		// 				)
		// 				.exec();
		// 			req.result = result;
		// 			return next();
		// 		} catch (e) {
		// 			return res.status(400).json({ message: e.message });
		// 		}
		// 	}
		// 	const result = {};
		// 	result.count = await await model.countDocuments(query);
		// 	try {
		// 		result.data = await model.find(query, data);
		// 		req.result = result;
		// 		return next();
		// 	} catch (e) {
		// 		return res.status(400).json({ message: e.message });
		// 	}
		// };
	},
	getAllUsers: function () {
		return new Promise((resolve, reject) => {
			User.find({}, this.usersProjection)
				.then((data) => {
					let users = data.filter(
						(user) => user.role[0].name.toLowerCase() !== "admin"
					);
					resolve(users);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	activeUser: function (id) {
		return new Promise((resolve, reject) => {
			User.findOneAndUpdate(
				{ _id: id },
				{ status: "active" },
				{ useFindAndModify: false }
			)
				.then((user) => {
					resolve(user);
				})
				.catch((err) => reject(err));
		});
	},
	dectiveUser: function (id) {
		return new Promise((resolve, reject) => {
			User.findOneAndUpdate(
				{ _id: id },
				{ status: "banned" },
				{ useFindAndModify: false }
			)
				.then((user) => {
					resolve({ message: "success", error: null });
				})
				.catch((err) => reject(err));
		});
	},
	comfirmPayment: async function (id) {
		try {
			const user = await User.findById({ _id: id });

			if (!user) throw new Error("user not found");

			if (user.confirmedPayment === true)
				throw new Error("user already confirmed");

			await User.findByIdAndUpdate(
				{ _id: id },
				{ confirmedPayment: true },
				{ useFindAndModify: false }
			);

			const invoice = new Invoice({
				user: user._id,
				amount: user.amount,
				invoiceId: new Date().getTime().toString().slice(5),
				code: user.icanCode,
				name: user.name,
				email: user.email,
				phone: user.phone,
				gender: user.gender,
				shirtSize: user.tshirtSize,
				society: user.nameOfSociety,
			});

			await invoice.save();

			//TODO: send receipt via email
			await mailgun.sendReceiptEmail(user.email, user.venue, invoice);

			sms.sendOne(
				user.phone,
				`Dear ${user.name}, your payment for ICAN Eastern Zonal  Conference 2025 has been confirmed, please login to your profile to print your receipt. Thanks`
			);
			// await cert.sendAfterConfirmed(user);

			return user;
		} catch (error) {
			return error;
		}
	},
	deleteUser: function (id) {
		return new Promise((resolve, reject) => {
			User.findByIdAndDelete(id)
				.then((doc) => {
					Invoice.findOneAndDelete({ user: doc._id })
						.then((data) => { })
						.catch((err) => err);
					resolve(doc);
				})
				.catch((err) => reject(err));
		});
	},
	updateUser: function (id, data) {
		return new Promise((resolve, reject) => {
			User.findOneAndUpdate(
				{ _id: id },
				{
					email: data.email,
					name: data.name,
					gender: data.gender,
					icanCode: data.icanCode,
					memberAcronym: data.memberAcronym,
					memberCategory: data.memberCategory,
					amount: data.amount,
					memberStatus: data.memberStatus,
					nameOfSociety: data.nameOfSociety,
					tellerNumber: data.tellerNumber,
					tshirtSize: data.tshirtSize,
					bankName: data.bankName,
					phone: data.phone,
				},
				{ useFindAndModify: false }
			)
				.then((doc) => {
					resolve(doc);
				})
				.catch((err) => reject(err));
		});
	},
	uploadUsers: async (data) => {
		// console.log("🚀 ~ file: admin.js ~ line 133 ~ data", data);

		try {
			let users = data.map((value) => {
				if (typeof value.confirmedPayment === "string") {
					if (value.confirmedPayment.toLowerCase() === "true")
						value.confirmedPayment = true;
					else {
						value.confirmedPayment = false;
					}
				}

				if (typeof value.confirmedPayment === "boolean") {
					value.confirmedPayment = value.confirmedPayment ? true : false;
				}
				value.password = value.password.toString();
				value.phone = value.phone.toString();
				value.tellerDate = moment().format();
				value.role = [{ name: value.role }];
				value.gender = value.gender.toLowerCase();
				value.confirm_password = value.password;
				value.bulk = true;
				return value;
			});
			const addedUser = [];
			users.forEach(async (user) => {
				const { errors, isValid } = validation.register(user);
				if (!isValid) {
					console.log(errors);
					throw new Error(errors);
				}
				let existingUser = await User.findOne({ email: user.email });

				if (existingUser) {
					console.log({ email: "User with this email already exist" });

					// throw new Error("user with this email already exist");
					return;
				}
				const newUser = new User({
					...user,
				});
				await newUser.save();
				addedUser.push(user);
				return user;
			});
			return addedUser;
		} catch (err) {
			throw new Error(err);
		}
		// return new Promise((resolve, reject) => {

		//   try {

		//   } catch (e) {
		//     return res.status(400).json(e.message);
		//   }
		// User.create(users)
		//   .then((users) => {
		//     users.forEach((user) => {
		//       // sms.sendOne(user.phone, `Dear ${user.name}, You Have Successfully Registered for the 2022 ICAN Eastern Conference. Here are your login details: Username: ${user.email}. password: ${user.password} `);
		//       mail.sendMail(
		//         user.email,
		//         "SUCCESSFULL REGISTRATION",
		//         email.register(user.name, user.email, user.password)
		//       );
		//     });
		//     resolve(users);
		//   })
		//   .catch((err) => {
		//     reject(err);
		//   });
	},
	getUsersReceipts: function () {
		return new Promise((resolve, reject) => {
			Invoice.find({})
				.then((receipts) => {
					resolve(receipts);
				})
				.catch((err) => reject(err));
		});
	},
	certSetting: function (cert) {
		return new Promise((resolve, reject) => {
			Settings.findOneAndUpdate(
				{},
				{ certificate: cert.cert },
				{ useFindAndModify: false }
			)
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	},
	sendCertificate: async function () {
		const total = await User.countDocuments({});
		const page = 3;
		const LIMIT = 20;
		const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

		console.log("pages -", Math.ceil(total / LIMIT));
		console.log("start index -", startIndex);

		let setting = await Settings.findOne({});
		// console.log(setting);
		// let users = await this.getAllUsers();
		// users = users.filter((user) => user.confirmedPayment);

		const users = await User.find({ confirmedPayment: true })
			.sort({ _id: 1 })
			.limit(LIMIT)
			.skip(startIndex);

		// let users = [
		// 	{
		// 		email: "katlybedrick@gmail.com",
		// 		name: "Okpala Obeddy Ogechukwu",
		// 		memberAcronym: "ACA",
		// 	},
		// ];
		// let users = [];
		// let users = await User.find({ email: "meetbeddy@gmail.com" });
		// const users = obed.filter((user) => user.confirmedPayment);

		return new Promise((resolve, reject) => {
			if ((setting && !setting.certificate) || !setting) {
				resolve(
					"PLEASE CLICK THE 'START CERTIFICATE DISTRIBUTION' BUTTON TO SET CERTIFICATE TRUE"
				);
			}
			users.forEach((user) => {
				cert.sendAfterConfirmed(user);
			});
			resolve(users);
		});
	},
	sendSMS: async function (message) {
		//  await this.getAllUsers();
		let users = await User.find({ status: "active" }, this.usersProjection);
		let usersPhone = await users.map((user) => user.phone);
		return new Promise((resolve, reject) => {
			let dataToSend = usersPhone.join(",");

			sms
				.sendMany(dataToSend, message)
				.then(() => resolve(users.length))
				.catch((err) => reject(err));
		});
	},
	getStats: async function (req, res, next) {
		try {
			const stats = {};
			const society = {};
			const shirtSize = {};
			const { balance } = await sms.getballance();
			let users = await User.find({ memberCategory: { $ne: "admin" } });
			const members = await User.find({ memberStatus: "member" });
			const invoice = await Invoice.find({ scanned: true });
			// users = users.filter(
			//   (value) =>
			//     value.memberCategory && value.memberCategory.toLowerCase() !== "admin"
			// );
			const active = users.filter((value) => value.status === "active");
			const banned = users.filter((value) => value.status === "banned");
			const physical = users.filter(
				(value) => value.venue.toLowerCase() === "physical"
			);
			const virtual = users.filter(
				(value) => value.venue.toLowerCase() === "virtual"
			);
			const confirmed = users.filter((value) => value.confirmedPayment);
			const unConfirmed = users.filter((value) => !value.confirmedPayment);
			const fullPaymingMembers = confirmed.filter(
				(value) =>
					(value.memberCategory.toLowerCase().includes("full-paying member") ||
						value.memberCategory.toLowerCase().includes("full paying")) &&
					value.memberStatus.toLowerCase() === "member"
			);
			const fullPaymingMembersTotal = fullPaymingMembers.reduce(
				(acc, cur) => acc + cur.amount,
				0
			);
			const halfPaymingMembers = confirmed.filter(
				(value) =>
					(value.memberCategory.toLowerCase().includes("half-paying member") ||
						value.memberCategory.toLowerCase().includes("half paying")) &&
					value.memberStatus.toLowerCase() === "member"
			);
			const halfPaymingMembersTotal = halfPaymingMembers.reduce(
				(acc, cur) => acc + cur.amount,
				0
			);
			const youngAccountants = confirmed.filter(
				(value) =>
					value.memberCategory.toLowerCase().includes("young-accountants") &&
					value.memberStatus.toLowerCase() === "member"
			);
			const youngAccountantsTotal = youngAccountants.reduce(
				(acc, cur) => acc + cur.amount,
				0
			);
			const nonMembers = await confirmed.filter((value) => value.memberStatus.toLowerCase() === "nonmember");
			const nonMembersTotal = nonMembers.reduce(
				(acc, cur) => acc + cur.amount,
				0
			);

			members.forEach((user) => {
				society[user.nameOfSociety] = society[user.nameOfSociety]
					? [...society[user.nameOfSociety], user]
					: [user];
				shirtSize[user.tshirtSize] = shirtSize[user.tshirtSize]
					? [...shirtSize[user.tshirtSize], user]
					: [user];
			});
			stats.registered = users.length;
			stats.active = active.length;
			stats.banned = banned.length;
			stats.confirmed = confirmed.length;
			stats.unConfirmed = unConfirmed.length;
			stats.fullPaymingMembers = {
				numbers: fullPaymingMembers.length,
				amount: fullPaymingMembersTotal,
			};
			stats.halfPaymingMembers = {
				numbers: halfPaymingMembers.length,
				amount: halfPaymingMembersTotal,
			};
			stats.youngAccountants = {
				numbers: youngAccountants.length,
				amount: youngAccountantsTotal,
			};
			stats.nonMembers = {
				numbers: nonMembers.length,
				amount: nonMembersTotal,
			};
			stats.society = society;
			stats.shirtSize = shirtSize;
			stats.balance = balance;
			stats.physical = physical.length;
			stats.virtual = virtual.length;
			stats.attended = invoice.length;

			res.json(stats);
		} catch (e) {
			res.status(400).json(e);
		}
	},
	markAttendance: async function (req, res, next) {
		const { search } = req.body;

		try {
			const invoice = await Invoice.findOne({ invoiceId: search });
			if (!invoice)
				return res
					.status(400)
					.json({ message: "User not found", success: false });
			if (invoice.scanned)
				return res
					.status(400)
					.json({ message: "Attendance already taken", success: false });
			await Invoice.findByIdAndUpdate(
				{ _id: invoice._id },
				{ scanned: true },
				{ useFindAndModify: false }
			);
			return res.json({
				success: true,
				message: "Attendance taken successfully",
			});
		} catch (e) {
			res.status(500).json({ success: false, message: e.message });
		}
	},
	uploadPapers: async function (req, res, next) {
		try {
			if (!req.file)
				return res
					.status(400)
					.json({ message: "please choose a file to upload" });
			const { key, mimetype, location, size } = req?.file;
			const lastUnderScore = key.lastIndexOf("__");
			const file_name = key.slice(lastUnderScore + 2);
			const file = new File({
				file_key: key,
				file_mimetype: mimetype,
				file_location: location,
				file_name,
				file_size: size,
			});
			await file.save();
			res.status(200).json({ message: "file upload successful" });
		} catch (error) {
			res
				.status(500)
				.json({ message: "Something went wrong", error: error.message });
		}
	},

	getPapers: async function (req, res, next) {
		try {
			const file = await File.find();
			res.send(file);
		} catch (error) {
			res
				.status(500)
				.json({ message: "Something went wrong", error: error.message });
		}
	},
	downloadPaper: async function (req, res, next) {
		try {
			const file = await File.findOne({ file_key: req.params.id });

			res.set({
				"Content-Type": file.file_mimetype,
			});

			const params = {
				Key: file.file_key,
				Bucket: "imt-class",
			};

			s3.getObject(params, (err, data) => {
				if (err) {
					res.status(400).json(`Error: ${err}`);
				} else {
					// return the file object from the DB, as well as the actual file data in the form of a buffer array from the S3 object
					res.json({ file: file.cv, data });
				}
			});
		} catch (error) {
			res
				.status(500)
				.json({ message: "Something went wrong", error: error.message });
		}
	},
	deletePaper: async function (req, res, next) {
		try {
			await File.findOneAndDelete({ file_key: req.params.id });
			const file = await File.find();

			res.send({ file, message: "file deleted" });
		} catch (error) {
			res
				.status(500)
				.json({ message: "Something went wrong", error: error.message });
		}
	},
	fetchAsCsv: async function (req, res, next) {
		try {
			const users = await User.find({ confirmedPayment: true })
				.sort({ name: -1 })
				.select({
					_id: 0,
					name: 1,
					email: 1,
					phone: 1,
					bankName: 1,
					tellerNumber: 1,
					tellerDate: 1,
					gender: 1,
					tshirtSize: 1,
					memberStatus: 1,
					icanCode: 1,
					memberCategory: 1,
					memberAcronym: 1,
					nameOfSociety: 1,
					venue: 1,
					amount: 1,
					confirmedPayment: 1,
					createdAt: 1,
				});

			const csvstring = [
				[
					"Name",
					"Email",
					"Phone",
					"Bank Name",
					"tellerNumber",
					"tellerDate",
					"gender",
					"tshirtSize",
					"memberStatus",
					"icanCode",
					"memberCategory",
					"memberAcronym",
					"nameOfSociety",
					"venue",
					"amount",
					"confirmedPayment",
					"createdAt",
				],
				...users.map((user) => [
					user.name,
					user.email,
					user.phone,
					user.bankName,
					user.tellerNumber,
					user.tellerDate,
					user.gender,
					user.tshirtSize,
					user.memberStatus,
					user.icanCode,
					user.memberCategory,
					user.memberAcronym,
					user.nameOfSociety,
					user.venue,
					user.amount,
					user.confirmedPayment,
					user.createdAt,
				]),
			]
				.map((e) => e.join(","))
				.join("\n");

			fs.writeFile("users-details.csv", csvstring, (err) => {
				if (err) {
					console.error(err);
				}
			});
			res.send(csvstring);
		} catch (error) {
			res
				.status(500)
				.json({ message: "Something went wrong", error: error.message });
		}
	},
};
