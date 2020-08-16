const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const cors = require('cors');


const authRoute = require("./routes/v1/auth");
const AdminRoute = require("./routes/v1/admin");
const userRoute = require("./routes/v1/user");
const api = require("./routes/v1/angels");
const moment = require("moment");


const User = require("./models/User");
const Setting = require("./models/Settings");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);
app.use(cors())
app.use("/api/user", authRoute);
app.use("/api/admin", AdminRoute);
app.use("/api/attendant", userRoute);
app.use("/api", api);
// Server static assets if in production
const port = process.env.PORT || 5000;
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    Setting.find({}).then(setting => {
        if (!setting.length) {
            let cert = new Setting({ certificate: false });
            cert.save().then(() => console.log("CERT SET TO FALSE")).catch(err => console.log("CERT SET ERROR"))
        }
    })
    User.find({ email: "admin@admin.com" }).then(user => {
        if (!user.length) {
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
            });
            admin
                .save()
                .then(() => {
                    app.listen(port, () =>
                        console.log("App Running on Port " + port)
                    );
                    console.log("Admin Created");
                })
                .catch(err => console.log(err));
        } else {
            app.listen(port, () => console.log("App Running on Port " + port));
        }
    });
});