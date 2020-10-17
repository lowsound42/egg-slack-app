const express = require("express")
const app = express()
const port = process.env.PORT || 8042
const http = require('http')
const axios = require("axios")
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
            "text": `So, basically, it's like an ${JSON.parse(data).this} for ${JSON.parse(data).that}`
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
                "text": `So, basically, it's like a ${JSON.parse(data).this} for ${JSON.parse(data).that}`
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


app.post("/light", (request, res) => {
  console.log(request.body.text)
  var thing = request.body.text

  if (thing == "on")
  {
    axios.put('http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/state', {
      "on": true
    })
  }

  if (thing == "off")
  {
    axios.put('http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/state', {
      "on": false
    })
  }
  res.send("You're messing with my lights")
})



app.listen(port, () => {
  console.log(`Greetings Commander, we're on port ${port}`)
})
