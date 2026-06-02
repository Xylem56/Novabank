const authMiddleware = require("../middleware/auth")
const express = require("express")
const router = express.Router()

const User = require("../models/user")
const Transaction = require ("../models/transaction")


router.get ("/balance", authMiddleware, async (req, res) => {

    const email = req.user.email  
    
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json ({message: "Email does not exist"})

        }
        res.status(200).json({balance: user.balance})
    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
})

router.post ("/deposit", authMiddleware, async (req, res) => {
    const email = req.user.email
    const {amount} = req.body
    
try {
    const user = await User.findOne({email})
    if (!user) {
        res.status(400).json({message: "Email does not exist"})
    }
    if (amount <= 0) {
        return res.status(400).json({message: "amount must be greater than 0"})
    }
    user.balance += amount
    await user.save()

    const transaction = new Transaction({
        type: "deposit",
        amount: amount,
        email: email
    })
    await transaction.save()

    res.status(200).json({message: "Deposit successful", balance: user.balance})
} catch (err) {
    res.status(500).json({message: "Server error"})
}

})

router.post("/withdraw", authMiddleware,async (req, res) => {
    const email = req.user.email
    const {amount} = req.body
    
    if (!amount) {
        return res.status(400).json({message: "Amount is required"})
    } 
    try{

    const user = await User.findOne({email}) 
    if (!user) {
        return res.status(400).json({message: "Email does not exist"})
    }
    if (amount <= 0) {
        return res.status(400).json({message: "Amount must be greater than 0 "})
    }
    if (user.balance < amount) {
        return res.status(400).json({message: "Insufficient funds "})
    }
    user.balance -= amount
    await user.save()
    await Transaction.create({
        type: "withdrawal",
        email: email,
        amount: amount
    })

    res.status(200).json({message: " Withdrawal Successfull", balance: user.balance})
    }
    catch(err) {
        res.status(500).json({message: "Server error"})
    }
})

router.post("/transfer", authMiddleware, async(req, res) => {
    const senderEmail = req.user.email
    const {recipientEmail, amount} = req.body
    if (!senderEmail || !recipientEmail || !amount) {
        return res.status(400).json({message: "All fields are required"})

    }
    try {
    const sender = await User.findOne({email: senderEmail})
    const recipient = await User.findOne({email: recipientEmail})
    if (!sender) {
        return res.status(400).json({ message: " Sender email does not exist"})
    }
    if (!recipient) {
        return res.status(400).json({ message: " this email is invalid"})

    }
    if (amount <=0) {
        return res.status(400).json({message: "amount must be greater than 0"})
    }
    if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient funds "})

    }
    sender.balance -= amount
    await sender.save()
    recipient.balance += amount
    await recipient.save()

    await Transaction.create({
        type: "transfer",
        senderEmail: senderEmail,
        recipientEmail: recipientEmail,
        amount: amount
    })

    res.status(200).json({message: "transfer successfull", senderBalance: sender.balance, recipientBalance: recipient.balance})
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Server error"})
    }
    })

    router.get("/transactions", authMiddleware, async (req, res) => {
        const email = req.user.email
        try {
        const transactions = await Transaction.find({ $or: [
            { email: email },
            { senderEmail: email },
            { recipientEmail: email }
        ]})
       if (transactions.length === 0) {
        return res.status(404).json({message: "No transactions found for this email"})
       }
        res.status(200).json({transactions})
    } catch (err) {
        res.status(500).json({message: "Server error"})
    }
    })


module.exports = router