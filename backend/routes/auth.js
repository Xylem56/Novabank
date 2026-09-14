const express = require("express")

const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/user")


router.post("/", async (req, res) => {
const { firstName, lastName, email, password, dateOfBirth, phoneNumber } = req.body

if (!firstName || !lastName || !email || !password || !dateOfBirth || !phoneNumber) {
    return res.status(400).json({message: "All fields are required"})
}
try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        dateOfBirth,
        phoneNumber
    })
    await newUser.save()
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET)
    res.status(201).json ({
        message: "User created successfully",
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email, balance: newUser.balance, phoneNumber: newUser.phoneNumber, dateOfBirth: newUser.dateOfBirth }
    })
} catch (err) {
    if (err.code ===11000) {
        return res.status(400).json({message: "Email already exists"})
    }
    res.status(500).json({message: "Server error"})
}

})

 router.post ("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({message: "Email and password are required"})
    } 
    try {
        const user = await User.findOne({email: email.trim().toLowerCase()})
        if (!user) {
            return res.status(401).json({message: "Invalid credentials"})
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json ({message: "Invalid credentials"})
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)
        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, balance: user.balance, phoneNumber: user.phoneNumber, dateOfBirth: user.dateOfBirth }
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Server error"}) 
    }
    })
    



module.exports = router

