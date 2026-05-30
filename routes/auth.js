const express = require("express")

const router = express.Router()

const User = require("../models/user")

router.post("/", async (req, res) => {
const { name, email, password } = req.body

if (!name || !email || !password) {
    return res.status(400).json({message: "All fields are required"})
}
try {
    const newUser = new User({ name, email, password})
    await newUser.save()
    res.status(201).json ({ message: "User created successfully"})
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
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({message: "Invalid credentials"})
        }
        if (user.password !== password) {
            return res.status(401).json ({message: "Invalid credentials"})
        }
        res.status(200).json({message: "Login successful"})
    } catch (err) {
        res.status(500).json({message: "Server error"}) 
    }
    })
    
module.exports = router

