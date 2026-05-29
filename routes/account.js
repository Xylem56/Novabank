const express = require("express")
const router = express.Router()

const {users, transactions} =  require ("../data")

router.get ("/balance", (req, res) => {

    const { email } = req.body
    if (!email) {
        return res.status(400).json({message: "Email is required"})
    }
    const user = users.find(user => user.email === email)
    if (!user) {
        return res.status(404).json({message: "User not found"})
    }
    res.status(200).json({balance: user.balance})
})

router.post ("/deposit", (req, res) => {
    const {email, amount} = req.body
    if (!email) {
        return res.status(400).json({message: "Email is required"})
    }
    const user = users.find(user => user.email === email)
    if (!user) {
        return res.status(400).json({message: "Email does not exist"})
    }
    
    if (amount <= 0) {
        return res.status(400).json({message: "Amount must be greater than 0"})
    }
    user.balance += amount

      transactions.push({
        id: Date.now(),
        type: "deposit",
        email: email,
        amount: amount,
        date: new Date()
    })
    res.status(200).json({message: "Deposit successful", balance: user.balance})


})

router.post("/withdraw", (req, res) => {
    const {email, amount} = req.body
    if (!email) {
        return res.status(400).json({message: "Email is required"})
    }
    if (!amount) {
        return res.status(400).json({message: "Amount is required"})
    }

    const user = users.find(user => user.email === email)
    if (!user) {
        return res.status(400).json({message: "Email does not exist"})
    }
    if (amount <= 0) {
        return res.status(400).json({message: "Amount must be greater than 0 you broke boy "})
    }
    if (user.balance < amount) {
        return res.status(400).json({message: "Insufficient funds bro"})
    }
    user.balance -= amount

    
    transactions.push({
        id: Date.now(),
        type: "withdrawal",
        email: email,
        amount: amount,
        date: new Date()
    })
    res.status(200).json({message: " Withdrawal Successfull", balance: user.balance})

})

router.post("/transfer", (req, res) => {
    const {senderEmail, recipientEmail, amount} = req.body
    if (!senderEmail || !recipientEmail || !amount) {
        return res.status(400).json({message: "All fields are required"})

    }
const sender = users.find(user => user.email === senderEmail)
    const recipient = users.find(user => user.email === recipientEmail)
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
    recipient.balance += amount

    
    transactions.push({
        id :Date.now(),
        type: "transfer",
        senderEmail: senderEmail,
        recipientEmail: recipientEmail,
        amount: amount,
        date: new Date()
    })
    res.status(200).json({message: "transfer successfull", senderBalance: sender.balance, recipientBalance: recipient.balance})

    })

    router.get ("/transactions", (req,res) => {
        const { email} = req.body
        if (!email) {
            return res.status(400).json({message: "email is required"})

        }
        const userTransactions = transactions.filter(transaction =>
             transaction.email === email ||
            transaction.senderEmail === email||
            transaction.recipientEmail === email)
        res.status(200).json({transactions: userTransactions})

    })

module.exports = router