const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const settingSchema = mongooseSchema({
  certificate: { type: Boolean, required: true, default: false },
});

module.exports = Setting = mongoose.model("setting", settingSchema);
