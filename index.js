//Load the required libraries
var express = require("express");
var bodyParser = require("body-parser");

//Define the express app and port
var app = express();
var port = process.env.PORT || 3000;

//Check for a valid response
var surveyResponses = ["angular", "ember", "react", "vanilla", "other"];
var surveyResults = {};
surveyResponses.map(function(e) {surveyResults[e] = 0;});

app.use(bodyParser.urlencoded());

app.post("/sms", function(req, res) {
  var body = req.body;
  var from = body.From;
  var message = body.Body;
  var responseBody = "";
  
  var validResponses = surveyResponses.filter(function(e) {
    return message.toLowerCase().indexOf(e) > -1;
  });

  validResponses.map(function(e) {surveyResults[e]++;});

  console.log(surveyResults);

  if (validResponses.length) {
    responseBody = "Thank you for voting";
  } else {
    responseBody = "This was not a valid choice.  Valid answers are ";
    surveyResponses.map(function(e) {responseBody += e + ", "});
    responseBody = responseBody.substr(0, responseBody.length-2);
  }

  res.header('Content-Type', 'text/xml');
  res.send("<?xml version='1.0' encoding='UTF-8' ?><Response><Message>" + responseBody + "</Message></Response>");
});

//Serve static files from the public_html folder
app.use(express.static(__dirname + "/public_html"));

//Start me up !
app.listen(port);
console.log("Server listening on port " + port);