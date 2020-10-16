const express = require("express")
const app = express()
const port = process.env.PORT || 8080

app.get("/", (req, res) => {
  res.send("I'M ALIVE!")
})

app.listen(port, () => {
  console.log("Greetings Commander")
})