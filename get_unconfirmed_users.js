const connect_db = require("./config/db_connection");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config({ path: __dirname + '/.env' });

const User = require("./models/User");

async function run() {
    await connect_db();
    
    // Find users with remita transaction who are currently unconfirmed 
    // AND have a valid tellerNumber (RRR)
    const users = await User.find({ 
        bankName: "remita transaction", 
        confirmedPayment: false,
        tellerNumber: { $exists: true, $ne: "" }
    });
    
    const unconfirmedUsers = users.map(user => ({
        name: user.name,
        email: user.email,
        phone: user.phone,
        rrr: user.tellerNumber,
        amount: user.amount
    }));

    require('fs').writeFileSync(__dirname + '/unpaid_remita_users.json', JSON.stringify(unconfirmedUsers, null, 2));
    console.log(`Saved ${unconfirmedUsers.length} users to unpaid_remita_users.json`);
    
    process.exit(0);
}

run();
