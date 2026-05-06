const User = require("../models/User");
const db = require("../config/db_connection");
const sendCertHelper = require("../helpers/sendCert");

const genReceipt = async () => {
    try {
        console.log("Fetching users with confirmed payment and unsent certificates...");
        const users = await User.find({ confirmedPayment: true, sentCertificate: { $ne: true } });
        
        console.log(`Found ${users.length} users. Starting distribution...`);
        
        let successCount = 0;
        let errorCount = 0;

        const delay = ms => new Promise(res => setTimeout(res, ms));
        const useDelay = users.length > 5;
        if (useDelay) {
            console.log(`Large user list detected (${users.length} users). Implementing a 38-second delay between emails to stay within Mailgun's 100/hour probation limit.`);
        }

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            try {
                console.log(`[${i + 1}/${users.length}] Processing: ${user.name} (${user.email})`);
                
                await sendCertHelper.sendAfterConfirmed({
                    email: user.email,
                    name: user.name,
                    memberAcronym: user.memberAcronym
                });
                
                user.sentCertificate = true;
                await user.save();
                console.log(`Successfully sent cert and updated DB for: ${user.email}`);
                successCount++;
            } catch (err) {
                console.error(`Error processing user ${user.email}:`, err.message);
                errorCount++;
            }

            if (useDelay && i < users.length - 1) {
                console.log(`Waiting 38 seconds before next email...`);
                await delay(38000);
            }
        }

        console.log("-----------------------------------------");
        console.log("Batch Generation Completed!");
        console.log(`Total Processed in this run: ${users.length}`);
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