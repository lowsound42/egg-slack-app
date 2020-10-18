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
  var thing = request.body.text
  console.log(thing);
  var lightState;
  axios.get("http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/")
  .then(function(response){
    lightState = response.data.state.on
  }).then(function(response){
    console.log("THING IS: ", thing)
    switch(thing){
      case thing = "green":
        axios.put('http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/state', {
        "on": true,
        "hue":  21845 
      })
      break;
      case thing = "red":
        axios.put('http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/state', {
        "on": true,
        "hue":  65535
      })
      break;
      case thing = "blue":
        axios.put('http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/state', {
        "on": true,
        "hue":  43690 
      })
      break;
      case thing = "reset":
        axios.put('http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/state', {
        "on": true,
        "hue":  8597 
      })
      break;
      case thing = "off":
        axios.put('http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/state', {
        "on": false,
      })
      break;
      default: 
        axios.put('http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/1/state', {
        "on": true,
        "hue":  8597 
      })
    }
  })
  res.send("You're messing with my lights")
})



app.listen(port, () => {
  console.log(`Greetings Commander, we're on port ${port}`)
})
