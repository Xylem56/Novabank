const express = require("express")

const router = express.Router()
const {users, transactions} = require("../data")

router.post("/", (req, res) => {
const { name, email, password } = req.body

if (!name || !email || !password) {
    return res.status(400).json({message: "All fields are required"})
}
const user = users.find(user => user.email === email)

if(user) {
    return res.status(400).json({message: "User already exists"})
}
 const newUser = {name, email, password, balance: 0}
 users.push(newUser)
 res.status(201).json({message: "User created successfully"})
  
 
 })

 router.post ("/login", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({message: "Email and password are required"})
    }
    const user = users.find( user => user.email === email)
    if (!user) {
        return res.status(401).json({message: "Invalid credentials"})
    }
    if (user.password !== password) {
        return res.status(401).json({message: "Invalid credentials"})
    }

    res.status(200).json({message: "Login successful"})
 })
module.exports = router

