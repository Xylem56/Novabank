const express = require("express")
const app = express()

app.use(express.json())
app.use("/auth", require("./auth"))
app.use("/accounts", require("./account"))

app.listen(5000, () => {
    console.log("Server is running on port 5000...")
})