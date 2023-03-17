const express = require("express");
const router = express.Router();
const adminHelper = require("../../helpers/admin");
const passport = require("passport");
const Users = require("../../models/User");
const Receipt = require("../../models/Invoice");
const upload = require("../../configs/awsConfig").upload;

router.get(
	"/all/users",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.paginated(req, {}, { __v: false, password: false }, Users)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => res.status(400).json(err));
	}
);
router.get(
	"/all/users/new",
	passport.authenticate("jwt", { session: false }),

	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.paginated(
				req,
				{ confirmedPayment: false },
				{ __v: false, password: false },
				Users
			)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => res.status(400).json(err));
	}
);
router.get(
	"/all/users/active",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.paginated(
				req,
				{ status: "active", confirmedPayment: true },
				{ __v: false, password: false },
				Users
			)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => res.status(400).json(err));
	}
);
router.get(
	"/all/users/banned",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.paginated(
				req,
				{ status: "banned" },
				{ __v: false, password: false },
				Users
			)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => res.status(400).json(err));
	}
);

router.get(
	"/users/receipts",
	passport.authenticate("jwt", { session: false }),

	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.paginated(req, {}, { __v: false, password: false }, Receipt)
			.then((result) => {
				res.json(result);
			})
			.catch((err) => res.status(400).json(err));
	}
);
router.put(
	"/user/activate",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}

		adminHelper
			.activeUser(req.query.id)
			.then((doc) => {
				res.json(doc);
			})
			.catch((err) => res.status(400).json(err));
	}
);
router.put(
	"/user/deactivate",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.dectiveUser(req.query.id)
			.then((doc) => {
				res.json(doc);
			})
			.catch((err) => res.status(400).json(err));
	}
);

//
router.put(
	"/user/confirm/payment",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.comfirmPayment(req.query.id)
			.then((doc) => {
				res.json(doc);
			})
			.catch((err) => res.status(400).json(err));
	}
);

router.delete(
	"/user/delete/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.deleteUser(req.params.id)
			.then((doc) => {
				return res.json(doc);
			})
			.catch((err) => res.status(400).json(err));
	}
);
router.put(
	"/user/update/:id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}

		adminHelper
			.updateUser(req.params.id, req.body)
			.then((doc) => {
				res.json(doc);
			})
			.catch((err) => res.status(400).json(err));
	}
);
router.get(
	"/user/stats",
	passport.authenticate("jwt", { session: false }),
	adminHelper.getStats
);

router.post(
	"/users/upload",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		// console.log(req);
		adminHelper
			.uploadUsers(req.body)
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => res.status(500).json(err));
	}
);

// router.post(
//   "/users/upload",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     if (req.user.role[0].name.toLowerCase() !== "admin") {
//       return res.status(401).json({ message: "unauthorized" });
//     }
//     adminHelper
//       .uploadUsers(req.body)
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//         console.log(err.message);
//       });
//   }
// );

router.post(
	"/set_cert",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.certSetting(req.body)
			.then((data) => res.json(data))
			.catch((err) => res.status(400).json(err));
	}
);
router.post(
	"/send_certificates",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.sendCertificate()
			.then((data) => res.json(data))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	}
);

router.post(
	"/send_sms",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user.role[0].name.toLowerCase() !== "admin") {
			return res.status(401).json({ message: "unauthorized" });
		}
		adminHelper
			.sendSMS(req.body.message)
			.then((data) => res.json(data))
			.catch((err) => res.status(400).json(err));
	}
);
router.post(
	"/attendance",
	passport.authenticate("jwt", { session: false }),
	adminHelper.markAttendance
);

router.post(
	"/uploadpaper",
	[passport.authenticate("jwt", { session: false }), upload.single("file")],
	adminHelper.uploadPapers
);
router.get(
	"/fetchpapers",
	passport.authenticate("jwt", { session: false }),
	adminHelper.getPapers
);
router.get(
	"/downloadpaper/:id",
	passport.authenticate("jwt", { session: false }),
	adminHelper.downloadPaper
);

router.delete(
	"/deletepaper/:id",
	passport.authenticate("jwt", { session: false }),
	adminHelper.deletePaper
);

router.get("/getcontact", adminHelper.fetchAsCsv);

module.exports = router;
