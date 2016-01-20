//Load the required libraries
var express = require("express");
var bodyParser = require("body-parser");

//Define the express app and port
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.raw());

app.post("/sms", function(req, res) {
  response.header('Content-Type', 'text/xml');
  var body = request.param('Body').trim();
  
  // the number the vote it being sent to (this should match an Event)
  var to = request.param('To');
  
  // the voter, use this to keep people from voting more than once
  var from = request.param('From');


  console.log("received req");
  console.log(req.body);
  console.log(body, to, from);
  res.send("<?xml version='1.0' encoding='UTF-8' ?><Response><Message>Hey, I got your message</Message></Response>");
});

//Serve static files from the public_html folder
app.use(express.static(__dirname + "/public_html"));

//Start me up !
app.listen(port);
console.log("Server listening on port " + port);