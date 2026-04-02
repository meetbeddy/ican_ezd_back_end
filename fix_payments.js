const connect_db = require("./config/db_connection");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config({ path: __dirname + '/.env' });

const User = require("./models/User");
const Invoice = require("./models/Invoice");
const paymentHelper = require("./helpers/payment");

async function fixPayments() {
    try {
        await connect_db();
        
        console.log("Analyzing users with 'remita transaction' who are marked as confirmed...");
        
        const users = await User.find({ 
            bankName: "remita transaction", 
            confirmedPayment: true 
        });
        
        console.log(`Found ${users.length} users... Checking statuses directly with Remita.`);
        
        const updatedUsers = [];
        let skippedUsers = 0;
        
        for (const user of users) {
            if (!user.tellerNumber) {
                skippedUsers++;
                continue;
            }
            
            try {
                const result = await paymentHelper.checkPaymentStatus(user.tellerNumber);
                
                // If it is NOT a successful payment based on strict status codes
                if (!["00", "01"].includes(result?.status)) {
                    
                    // Mark user as unconfirmed
                    user.confirmedPayment = false;
                    await user.save();
                    
                    // Delete any accidental invoices/receipts generated for this user
                    const invoiceResult = await Invoice.deleteMany({ user: user._id });
                    
                    updatedUsers.push({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        rrr: user.tellerNumber,
                        remitaStatus: result?.status,
                        remitaMessage: result?.message,
                        receiptsDeleted: invoiceResult.deletedCount
                    });
                } else {
                    skippedUsers++;
                }
            } catch (err) {
                console.error(`Error checking RRR ${user.tellerNumber} for ${user.email} ->`, err.message);
            }
        }
        
        console.log("\n====================================");
        console.log(`Analysis Complete.`);
        console.log(`Valid paid transactions found: ${skippedUsers}`);
        console.log(`Incorrectly confirmed transactions reverted: ${updatedUsers.length}`);
        console.log("====================================\n");
        
        if (updatedUsers.length > 0) {
            console.log("The following records were reverted. Please notify these users to complete their payment:\n");
            console.log(JSON.stringify(updatedUsers, null, 2));
        }

    } catch (e) {
        console.error("Critical error:", e);
    } finally {
        // cleanly exit the process
        await mongoose.disconnect();
        process.exit(0);
    }
}

fixPayments();
