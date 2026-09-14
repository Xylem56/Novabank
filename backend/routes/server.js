require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/auth", require("./auth"))
app.use("/accounts", require("./account"))


const mongoose = require ("mongoose")
const port = process.env.PORT || 5000
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/novabank"

mongoose.connect(mongoUri)
.then (() => console.log("Connected to MongoDB"))
.catch ((err) => console.error("Could not connect to MongoDB", err))

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}...`)
})