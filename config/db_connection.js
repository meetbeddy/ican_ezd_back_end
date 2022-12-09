const mongoose = require("mongoose");
const User = require("../models/User");
const moment = require("moment");

const connect = async () => {
  try {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    User.findOne({ email: "admin@admin.com" }).then(async (user) => {
      if (!user) {
        try {
          const admin = new User({
            role: { name: "Admin" },
            name: "admin",
            email: "admin@admin.com",
            password: "admin-secret",
            bankName: "Diamond Access",
            tellerNumber: "238987",
            tellerDate: moment(),
            phone: "08137173400",
            gender: "male",
            tshirtSize: "S",
            memberStatus: "ICAN Member",
            icanCode: "MB787654",
            memberCategory: "admin",
            memberAcronym: "ACA",
            nameOfSociety: "ABA DISTRICT",
            venue: "Physical",
          });
          await admin.save();
          console.log("Admin Created Succesfully");
        } catch (e) {
          console.log(e.message);
          console.log(e);
        }
      }
    });
  } catch (e) {
    console.log("🚀 ~ file: db_connection.js ~ line 39 ~ connect ~ e", e);
  }
};

module.exports = connect;
