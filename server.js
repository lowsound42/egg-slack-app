const express = require("express")
const app = express()
const port = process.env.PORT || 8000
const http = require('http')

app.get("/", (req, res) => {
  res.send("I'M ALIVE!")
  console.log("something happened")
})


app.post("/test", (req, res) => {
  http.get("http://itsthisforthat.com/api.php?json", (resp) => {
    let data = ''
    var vowelRegex = '^[aieouAIEOU].*'
    resp.on('data', (chunk) => {
      data += chunk
    })
    resp.on('end', () => {
      if (JSON.parse(data).this.match(vowelRegex)){
      res.send({
        "response_type": "in_channel",
        "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `It's an ${JSON.parse(data).this} for ${JSON.parse(data).that}`
          }
        }
      ]
    })
  } else {
    res.send({
      "response_type": "in_channel",
      "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `It's a ${JSON.parse(data).this} for ${JSON.parse(data).that}`
        }
      }
    ]
  })
  }
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  })
  
})


app.listen(port, () => {
  console.log(`Greetings Commander, we're on port ${port}`)
})