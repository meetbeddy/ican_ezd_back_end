const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const connect_db = require("./config/db_connection");

const authRoute = require("./routes/v1/auth");
const AdminRoute = require("./routes/v1/admin");
const userRoute = require("./routes/v1/user");
const api = require("./routes/v1/angels");
const paymentRoute = require("./routes/v1/payment")
const env = require("dotenv");
env.config();

const app = express();
connect_db();
app.use(bodyParser.json({ limit: "100mb" }));
// app.use(express.bodyParser({limit: '50mb'}));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(cors());
app.use("/api/user", authRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/attendant", userRoute);
app.use("/api/payments", paymentRoute);
app.use("/api", api);
app.use("/", (req, res) => {
    res.status(200).send("everything soft here");
})
const port = process.env.PORT || 5000;
// mongoose.set('useCreateIndex', true)
//database connect
// const db = process.env.MONGO_URL;

// mongoose
//   .connect(db, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => console.log("db connected"))
//   .catch((err) => console.log(err));
app.listen(port, () => console.log("App Running on Port " + port));
