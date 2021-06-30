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

app.get('/api/:number', (req, res) => {
  const param = req.params.number;

  const jsonToDate = new Date(param).toLocaleDateString();

  if ((/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/).test(jsonToDate)) {
    res.json({
      unix: Date.parse(param),
      utc: new Date(param).toDateString() + ' ' + new Date(param).toTimeString()
    });
  } else {
    const jsonToNumber = JSON.parse(param);
    const parseUnix = new Date(jsonToNumber).toDateString() + ' ' + new Date(jsonToNumber).toTimeString();
    res.json({
      unix: param,
      utc: parseUnix,
    });
  }
});

//listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
