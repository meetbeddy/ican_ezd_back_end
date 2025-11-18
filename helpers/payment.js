const axios = require("axios");
const crypto = require("crypto");

const REMITA_MERCHANT_ID = process.env.REMITA_MERCHANT_ID;
const REMITA_SERVICE_TYPE_ID = process.env.REMITA_SERVICE_TYPE_ID;
const REMITA_API_KEY = process.env.REMITA_API_KEY;  // consumerKey
const REMITA_API_SECRET = process.env.REMITA_API_SECRET; // consumerToken (hash seed)
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

        // Create the hash: SHA512(orderId + apiSecret + merchantId)
        const stringToHash = orderId + REMITA_API_SECRET + REMITA_MERCHANT_ID;
        const hash = crypto.createHash("sha512").update(stringToHash).digest("hex");

        const url = `${REMITA_BASE_URL}/echannelsvc/merchant/api/paymentinit`;

        const payload = {
            serviceTypeId: REMITA_SERVICE_TYPE_ID,
            amount,
            orderId,
            payerName,
            payerEmail,
            payerPhone,
            description
        };

        // console.log(payload)
        const apiHash = "ad2aca0d0555cdd3d7f35028d6a2c42acfdb57fb596acc83f099ab0b66414a1effb65658a1a337e33c18a52ca7ec0d5e1d1112576fde3db99db441eac2610847"

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `remitaConsumerKey=${REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
        };


        const response = await axios.post(url, payload, { headers });

        // Remita returns JSONP like: jsonp({"statuscode":"025","RRR":"1107..."})
        const raw = response.data;

        // Extract JSON from JSONP
        const match = raw.match(/jsonp\((.*)\)/);
        if (!match) throw new Error("Invalid Remita response format");

        const data = JSON.parse(match[1]);

        if (data.statuscode !== "025") {
            throw new Error(data.status || "Failed to generate RRR");
        }

        return {
            rrr: data.RRR,
            status: data.status,
            statuscode: data.statuscode
        };
    }
};
