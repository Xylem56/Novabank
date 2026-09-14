const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true, trim: true },
    balance: { type: Number, default: 0 }
})


const User = mongoose.model("User", userSchema)

module.exports = User