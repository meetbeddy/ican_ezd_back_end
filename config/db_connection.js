const mongoose = require("mongoose");
const User = require("../models/User");
const moment = require("moment");
const bcrypt = require("bcryptjs/dist/bcrypt");

const connect = async () => {
  console.log("connecting to db...");
  try {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password = "admin-secret"
    const hashedPassword = await bcrypt.hash(password, salt);
    User.findOne({ email: "admin@admin.com" }).then(async (user) => {
      if (!user) {
        try {
          const admin = new User({
            role: { name: "Admin" },
            name: "admin",
            email: "admin@admin.com",
            password: hashedPassword,
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
