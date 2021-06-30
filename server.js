// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:data?", (req, res) => {
  const data = req.params.data;
  let date;
  if (!data) {
    date = new Date();
    return res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
      });
  } else if (isNaN(data) && isNaN(Date.parse(data))) {
    return res.status(400).json({ "error": "Invalid Date" });
  } else {
    date = isNaN(data) ? new Date(data) : new Date(Number(data));
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

//listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
