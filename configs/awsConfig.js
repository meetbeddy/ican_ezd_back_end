const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
require("dotenv").config();

// Create a new instance of the S3 bucket object with the correct user credentials
const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  Bucket: "imt-class",
  apiVersion: "latest",
});

// Setup the congifuration needed to use multer
exports.upload = multer({
  // Set the storage as the S3 bucker using the correct configuration
  storage: multerS3({
    s3,
    acl: "public-read", // public S3 object, that can be read
    bucket: "imt-class", // bucket name
    key: function (req, file, cb) {
      // callback to name the file object in the S3 bucket
      // The filename is prefixed with the current time, to avoid multiple files of same name being uploaded to the bucket
      cb(null, `${new Date().getTime()}__${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 10000000,
  },

  // Configure the list of file types that are valid
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(
        /\.(jpeg|jpg|png|webp|gif|pdf|doc|docx|xls|xlsx|svg|ppt|pptx)$/
      )
    ) {
      return cb(
        new Error(
          "Unsupported file format, please choose a different file and retry."
        )
      );
    }
    cb(undefined, true); // continue with file upload without errors
  },
});
