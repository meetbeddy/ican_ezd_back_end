const axios = require("axios");
const crypto = require("crypto");

const REMITA_MERCHANT_ID = process.env.REMITA_MERCHANT_ID;
const REMITA_SERVICE_TYPE_ID = process.env.REMITA_SERVICE_TYPE_ID;
const REMITA_API_KEY = process.env.REMITA_API_KEY;
const REMITA_BASE_URL = "https://demo.remita.net";

module.exports = {
    initialisePayment: async (paymentData) => {
        const {
            amount,
            orderId,
            payerName,
            payerEmail,
            payerPhone,
            description
        } = paymentData;

        if (!amount || !payerName || !payerEmail) {
            throw new Error("Missing required payment fields");
        }

        // Correct hash formula
        const stringToHash = `${REMITA_MERCHANT_ID}${REMITA_SERVICE_TYPE_ID}${orderId}${amount}${REMITA_API_KEY}`;
        const apiHash = crypto.createHash("sha512").update(stringToHash).digest("hex");

        const url = `${REMITA_BASE_URL}/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit`;

        const payload = {
            serviceTypeId: REMITA_SERVICE_TYPE_ID,
            amount,
            orderId,
            payerName,
            payerEmail,
            payerPhone,
            description
        };

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `remitaConsumerKey=${REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
        };

        const response = await axios.post(url, payload, { headers });
        let raw = response.data;

        // console.log("Raw Remita Response:", raw);

        let data;

        // If JSON object returned directly
        if (typeof raw === "object") {
            data = raw;
        }
        // If JSONP with optional whitespace e.g. jsonp ( {…} )
        else if (typeof raw === "string") {
            const match = raw.trim().match(/jsonp\s*\(\s*(.*)\s*\)/i);
            if (!match) throw new Error("Invalid Remita response format");

            data = JSON.parse(match[1]);
        }
        else {
            throw new Error("Unknown Remita response type");
        }

        if (data.statuscode !== "025") {
            throw new Error(data.status || "Failed to generate RRR");
        }

        return {
            rrr: data.RRR,
            status: data.status,
            statuscode: data.statuscode
        };
    },

    checkPaymentStatus: async (rrr) => {

        const stringToHash = `${rrr}${REMITA_API_KEY}${REMITA_MERCHANT_ID}`;
        const apiHash = crypto.createHash("sha512").update(stringToHash).digest("hex");

        const url = `${REMITA_BASE_URL}/remita/exapp/api/v1/send/api/echannelsvc/${REMITA_MERCHANT_ID}/${rrr}/${apiHash}/status.reg`;

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `remitaConsumerKey=${REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
        };

        const response = await axios.get(url, { headers });
        let raw = response.data;
        let data;

        if (typeof raw === "object") {
            data = raw;
        }
        else if (typeof raw === "string") {
            const match = raw.trim().match(/jsonp\s*\(\s*(.*)\s*\)/i);
            if (!match) throw new Error("Invalid Remita response format");
            data = JSON.parse(match[1]);
        }
        else {
            throw new Error("Unknown Remita response type");
        }

        return data;
    },

};
