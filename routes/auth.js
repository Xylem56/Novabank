const express = require("express")

const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/user")


router.post("/", async (req, res) => {
const { name, email, password } = req.body

if (!name || !email || !password) {
    return res.status(400).json({message: "All fields are required"})
}
try {
    const newUser = new User({ name, email, password: hashedPassword })
    await newUser.save()
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
    res.status(201).json ({ message: "User created successfully", token })
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
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({message: "Invalid credentials"})
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(401).json ({message: "Invalid credentials"})
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        res.status(200).json({message: "Login successful", token})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Server error"}) 
    }
    })
module.exports = router

