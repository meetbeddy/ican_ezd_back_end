const mongoose = require("mongoose");
const User = require("../models/User");
const moment = require("moment");
const bcrypt = require("bcryptjs");

const connect = async () => {
  console.log("Connecting to MongoDB...");
  try {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("SUCCESS: Connected to MongoDB");

    // Check if Admin exists
    const adminUser = await User.findOne({ email: "admin@admin.com" });
    if (!adminUser) {
      console.log("Admin not found, creating default admin...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin-secret", salt);
      
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
      console.log("Default admin created successfully.");
    }
  } catch (e) {
    console.error("FAILURE: Could not connect to MongoDB");
    console.error(e.message);
    throw e; // Rethrow to allow caller to handle failure
  }
};

module.exports = connect;
