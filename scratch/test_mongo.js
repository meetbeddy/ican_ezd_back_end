const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function testConnection() {
    console.log("Testing connection to:", process.env.MONGO_URL);
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });
        console.log("SUCCESS: Connected to MongoDB");
        await mongoose.disconnect();
    } catch (err) {
        console.error("FAILURE: Could not connect to MongoDB");
        console.error(err);
    }
}

testConnection();
