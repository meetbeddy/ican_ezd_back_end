const axios = require('axios');

const formatPhoneNumber = (phone) => {
    // Remove all non-numeric characters except leading '+'
    let cleaned = phone.trim().replace(/(?!^\+)\D/g, '');
    
    // Convert 080... to +23480...
    if (cleaned.startsWith('0') && cleaned.length === 11) {
        return '+234' + cleaned.substring(1);
    }
    // Convert 10-digit numbers (missing leading 0) to +234...
    if (cleaned.length === 10) {
        return '+234' + cleaned;
    }
    // Convert 23480... to +23480...
    if (cleaned.startsWith('234') && cleaned.length === 13) {
        return '+' + cleaned;
    }
    // Add '+' if missing
    if (!cleaned.startsWith('+')) {
        return '+' + cleaned;
    }
    return cleaned;
};

const sendText = async (to, text) => {
    try {
        const apiKey = process.env.WASENDER_API_KEY;
        if (!apiKey) throw new Error("WASENDER_API_KEY is missing");

        const formattedTo = formatPhoneNumber(to);

        const payload = {
            to: formattedTo,
            text
        };

        const config = {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.post('https://www.wasenderapi.com/api/send-message', payload, config);
        return response.data;
    } catch (error) {
        console.error("WhatsApp send error:", error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    sendText
};
