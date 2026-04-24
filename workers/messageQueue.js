const MessageQueue = require("../models/MessageQueue");
const sms = require("../helpers/sms");
const whatsapp = require("../helpers/whatsapp");
const mailgun = require("../helpers/mailgun");
const emailTemplate = require("../helpers/email.template");

let isProcessing = false;
let whatsappSessionCount = 0;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const processQueue = async () => {
    if (isProcessing) return;
    isProcessing = true;

    try {
        const jobs = await MessageQueue.find({ status: "pending" }).limit(10);
        
        if (jobs.length === 0) {
            isProcessing = false;
            return;
        }

        // Mark as processing to lock them
        const jobIds = jobs.map(j => j._id);
        await MessageQueue.updateMany({ _id: { $in: jobIds } }, { $set: { status: "processing" } });

        for (const job of jobs) {
            try {
                if (job.type === "sms") {
                    await sms.sendMany(job.recipient, job.body);
                } else if (job.type === "email") {
                    const htmlBody = emailTemplate.broadcastMessage(job.subject, job.body);
                    await mailgun.sendMail(job.recipient, job.subject, htmlBody);
                } else if (job.type === "whatsapp") {
                    await whatsapp.sendText(job.recipient, job.body);
                    
                    // Anti-Spam Throttling for WhatsApp
                    const microDelay = Math.floor(Math.random() * (12000 - 4000 + 1)) + 4000;
                    await sleep(microDelay);
                    
                    whatsappSessionCount++;
                    if (whatsappSessionCount >= 20) {
                        whatsappSessionCount = 0;
                        console.log(`WhatsApp broadcast: Sent 20 messages, entering cooldown...`);
                        const cooldownDelay = Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000; // 1-2 mins
                        await sleep(cooldownDelay);
                    }
                }
                
                await MessageQueue.updateOne({ _id: job._id }, { status: "sent", attempts: job.attempts + 1 });
            } catch (err) {
                console.error(`Failed to send ${job.type} to ${job.recipient}:`, err.message);
                await MessageQueue.updateOne({ _id: job._id }, { 
                    status: "failed", 
                    error: err.message,
                    attempts: job.attempts + 1
                });
            }
            
            // Basic universal spacing between any type of message
            await sleep(1000); 
        }

    } catch (error) {
        console.error("Queue Processor Error:", error);
    }

    isProcessing = false;
};

const startWorker = () => {
    // Run the processor loop
    setInterval(processQueue, 10000);
    console.log("Message Queue Worker initialized and polling database...");
};

module.exports = { startWorker };
