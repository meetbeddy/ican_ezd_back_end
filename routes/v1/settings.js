// const router = require("express").Router();
// const passport = require("passport");
// const Settings = require("../../models/Settings");

// router.post("/", (req, res, next) => {
//   Settings.find({}).then(set => {
//     if (set.length) {
//       Settings.findByIdAndUpdate(
//         req.body.id,
//         {
//           numberOfStudents: req.body.student,
//           numberOfLectures: req.body.lecturer
//         },
//         { new: true }
//       )
//         .then(update => res.json(update))
//         .catch(err => res.json(err));
//       //Update
//     } else {
//       const settings = new Settings({
//         numberOfStudents: req.body.student,
//         numberOfLectures: req.body.lecturer
//       });

//       settings
//         .save()
//         .then(setting => res.json(setting))
//         .catch(err => res.json(err));
//     }
//   });
// });

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     Settings.find({}).then(setting => {
//       if (setting.length) {
//         res.json(setting);
//       } else {
//         res.json({ settings: "No settings set" });
//       }
//     });
//   }
// );
// module.exports = router;