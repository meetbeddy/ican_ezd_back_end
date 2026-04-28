const User = require("../models/User");
const db = require("../config/db_connection");
const sendCertHelper = require("../helpers/sendCert");

const genReceipt = async () => {
    try {
        console.log("Fetching users with confirmed payment...");
        const users = await User.find({ confirmedPayment: true });
        
        console.log(`Found ${users.length} users. Starting batch generation...`);
        
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            try {
                console.log(`[${i + 1}/${users.length}] Processing: ${user.name} (${user.email})`);
                
                await sendCertHelper.sendAfterConfirmed({
                    email: user.email,
                    name: user.name,
                    memberAcronym: user.memberAcronym
                });
                
                successCount++;
            } catch (err) {
                console.error(`Error processing user ${user.email}:`, err.message);
                errorCount++;
            }
        }

        console.log("-----------------------------------------");
        console.log("Batch Generation Completed!");
        console.log(`Total: ${users.length}`);
        console.log(`Success: ${successCount}`);
        console.log(`Errors: ${errorCount}`);
        console.log("-----------------------------------------");

    } catch (e) {
        console.error("Critical Job Error:", e);
    }
}

db().then(() => {
    genReceipt().then(() => {
        console.log("Job finished. Exiting...");
        process.exit(0);
    });
}).catch(err => {
    console.error("Job failed: Database connection error.");
    process.exit(1);
});