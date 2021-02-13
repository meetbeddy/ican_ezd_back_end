const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require('cors');
const connect_db = require("./config/db_connection");


const authRoute = require("./routes/v1/auth");
const AdminRoute = require("./routes/v1/admin");
const userRoute = require("./routes/v1/user");
const api = require("./routes/v1/angels");

dotenv.config();
const app = express();
connect_db();
app.use(bodyParser.json({ limit: "50mb"}));
// app.use(express.bodyParser({limit: '50mb'}));
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(cors())
app.use("/api/user", authRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/attendant", userRoute);
app.use("/api", api);
const port = process.env.PORT || 4000;
// mongoose.set('useCreateIndex', true)
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(port, () => console.log("App Running on Port " + port));