const express = require("express");
const router = express.Router();
const paymentHelper = require("../../helpers/payment");

router.post("/initialize", async (req, res) => {
    try {

        console.log(req.body)
        const paymentResult = await paymentHelper.initialisePayment(req.body);

        console.log(paymentResult)

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

module.exports = router;
