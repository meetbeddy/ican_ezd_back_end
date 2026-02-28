const express = require("express");
const router = express.Router();
const paymentHelper = require("../../helpers/payment");

router.post("/initialize", async (req, res) => {
    try {
        const paymentResult = await paymentHelper.initialisePayment(req.body);

        return res.status(200).json({
            message: "Payment initialized successfully",
            success: true,
            data: paymentResult,
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message || "Something went wrong",
            success: false,
        });
    }
});

router.get("/verify/:rrr", async (req, res) => {
    try {
        const { rrr } = req.params;

        if (!rrr) {
            return res.status(400).json({
                message: "RRR is required",
                success: false,
            });
        }

        const verificationResult = await paymentHelper.checkPaymentStatus(rrr);

        return res.status(200).json({
            message: "Payment verification complete",
            success: true,
            data: verificationResult,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || "Something went wrong",
            success: false,
        });
    }
});

router.get("/details/:reference", async (req, res) => {
    try {
        const { reference } = req.params;

        if (!reference) {
            return res.status(400).json({
                message: "Reference (Email or RRR) is required",
                success: false,
            });
        }

        const details = await paymentHelper.getPaymentDetails(reference);

        return res.status(200).json({
            message: "Payment details fetched successfully",
            success: true,
            data: details,
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || "Registration not found",
            success: false,
        });
    }
});


module.exports = router;
