const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageQueueSchema = new Schema(
    {
        recipient: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["email", "sms", "whatsapp"],
            required: true
        },
        subject: {
            type: String,
            required: function() {
                return this.type === 'email';
            }
        },
        body: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "processing", "sent", "failed"],
            default: "pending"
        },
        attempts: {
            type: Number,
            default: 0
        },
        error: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("messageQueue", MessageQueueSchema);
