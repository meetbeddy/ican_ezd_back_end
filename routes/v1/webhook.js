const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const authHelper = require("../../helpers/auth");

router.post("/remita/notification", async (req, res) => {
    try {
        // Remita typically sends a POST with a body containing the RRR and status
        // The exact structure can vary, but usually involves an RRR field.
        const { rrr, RRR } = req.body;
        const reference = rrr || RRR;

        if (!reference) {
            return res.status(400).json({
                message: "RRR is required in notification",
                success: false,
            });
        }

        const user = await User.findOne({ tellerNumber: reference });

        if (!user) {
            // We might want to log this but return 200 to Remita to stop retries
            console.log(`Webhook received for unknown RRR: ${reference}`);
            return res.status(200).json({
                message: "User not found for this RRR",
                success: true,
            });
        }

        if (user.confirmedPayment) {
            return res.status(200).json({
                message: "Payment already confirmed",
                success: true,
            });
        }

        // Update user to confirmed
        user.confirmedPayment = true;
        await user.save();

        // Trigger notifications and invoice generation
        // We need a raw password to send in the notification if possible, 
        // but for webhook we might not have it. The email template might need adjustment
        // or we just send the confirmation email.

        const amounts = authHelper.calculateAmount(user);

        await authHelper.sendNotifications({
            user,
            rawPassword: "[Consult Dashboard]", // We don't have the plain password anymore
            baseAmount: amounts.baseAmount,
            finalAmount: amounts.finalAmount,
            venue: user.venue,
            confirmedPayment: true,
        });

        return res.status(200).json({
            message: "Payment confirmed via webhook",
            success: true,
        });

    } catch (err) {
        console.error("Webhook Error:", err);
        return res.status(500).json({
            message: err.message || "Internal server error during webhook processing",
            success: false,
        });
    }
});

module.exports = router;
