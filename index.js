// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + '/views/index.html');
// });


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/', function(req, res) {
  res.json({
    "unix": Date.parse(new Date()),
    "utc": new Date().toUTCString()
  });
})

app.get('/api/:date', function(req, res) {
  // if (req.params.date) {
  //   const date = new Date(req.params.date);

  //   if (date) {
  //     const unixDate = Date.parse(date);
  //     const utcDate = date.toUTCString();

  //     if (dateIsValid(date)) {
  //       res.json({
  //         "unix": unixDate,
  //         "utc": utcDate
  //       });
  //     } else {
  //       res.json({ "error": "Invalid Date" });
  //     }
  //   } else {
  //     res.json({
  //       "unix": Date.parse(req.params.date),
  //       "utc": req.params.date.toUTCString()
  //     })
  //   }

  // }

  // function dateIsValid(date) {
  //   return date instanceof Date && !isNaN(date);
  // }

  const dateString = req.params.date;

  if(dateString === undefined || dateString.trim() === '') {
    res.json({
      "unix": new Date().getTime(),
      "utc": new Date().toUTCString()
    })
  } else {
    const date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);

    if (!isNaN(date.getTime())) { 
      // timestamp = getTimestamp(date);
      res.json({  "unix": date.getTime(),  "utc": date.toUTCString()})
    } else {
      res.json({
        "error": "Invalid Date"
      })    
    }
  }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
