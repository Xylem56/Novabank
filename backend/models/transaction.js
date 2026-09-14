const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    type: {type: String, enum: ["deposit", "withdrawal", "transfer"], required: true},
    amount: {type: Number, required: true},
    email: {type: String, },
    senderEmail: {type: String},
    recipientEmail: {type: String},
    date: {type: Date, default: Date.now}
})

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction
