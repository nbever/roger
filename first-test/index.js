
var fs = require("fs");
var https = require('https');
var express = require('express');


var app = express();
app.use(express.static(__dirname + '/client'));


var privateKey = fs.readFileSync('roger-private.pem').toString();
var certificate = fs.readFileSync('roger-509.pem').toString();


var httpOptions = {key: privateKey, cert: certificate};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

https.createServer(httpOptions, app).listen(8000, () => {
  console.log(">> Serving on " + 8000);
});
