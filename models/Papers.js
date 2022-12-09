const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// The schema for the file model
const fileSchema = new Schema(
  {
    file_key: { type: String, required: true, trim: true },
    file_mimetype: { type: String, required: true, trim: true },
    file_location: { type: String, required: true, trim: true },
    file_name: { type: String, required: true, trim: true },
    file_size: { type: Number, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

// Set the Time-to-Live to be 30 days, to potentially save space in the mongoDB database
fileSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 24 * 30 });
const File = mongoose.model("File", fileSchema);

module.exports = File;
