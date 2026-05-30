const express = require("express")
const app = express()

app.use(express.json())
app.use("/auth", require("./auth"))
app.use("/accounts", require("./account"))

const mongoose = require ("mongoose")
mongoose.connect("mongodb://localhost:27017/novabank")
.then (() => console.log("Connected to MongoDB"))
.catch ((err) => console.error("Could not connect to MongoDB", err))

app.listen(5000, () => {
    console.log("Server is running on port 5000...")
})