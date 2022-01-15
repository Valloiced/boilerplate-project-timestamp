// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let dates = req.params.date
  let date = new Date(dates.split("-")).toUTCString()

  if(dates.length == 13){
   let convertedDate = new Date(parseInt(dates)).toUTCString()

    res.json({"unix": parseInt(dates), "utc": convertedDate})
  } else {
    let tempDateArr = dates.split("-") 
    let tempDate = new Date(tempDateArr.join(","))
    let unix = Date.parse(tempDate)
    let testIfInvalid = unix.toFixed()

    if(testIfInvalid.length !== 13){
      unix = "error"
    }

    res.json({"unix": unix, "utc": date})
  }
});

app.get("/api/", (req, res) => {
  let current = new Date()

  res.json({"unix": Date.parse(current), "utc": current.toString()})
})


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
