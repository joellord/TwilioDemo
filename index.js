//Load the required libraries
var express = require("express");
var bodyParser = require("body-parser");
var Helpers = require("./helpers");

//Helper functions (defined here to remove noise)
var capitalize = Helpers.Capitalize;
var formattedChartData = function() {return Helpers.FormattedChartData(surveyResults);}

//Define the express app and port
var app = express();
var port = process.env.PORT || 3000;

//Valid responses for the survey
var surveyResponses = ["angular", "ember", "react", "vanilla", "other"];
//Store the survey data in memory
var surveyResults = {};
//Populate with random data initially (so we have data when the server restarts)
surveyResponses.map(function(e) {surveyResults[e] = Math.floor(Math.random()*3);});

//Twilio responses are sent as url encoded forms
app.use(bodyParser.urlencoded());

//POST /sms 
//Sent by Twilio with the incoming message data
//We process the data and the send a response to the user
app.post("/sms", function(req, res) {
  //From field
  var from = req.body.From;
  //Body (the SMS message)
  var message = req.body.Body;
  //Response we will send back to the user 
  var responseBody = "";
  
  //Extract the matching responses.  We could match more than one here for
  //testing purposes
  var validResponses = surveyResponses.filter(function(e) {
    return message.toLowerCase().indexOf(e) > -1;
  });

  //For each matching response, update the survey results
  validResponses.map(function(e) {surveyResults[e]++;});

  //If we have at least one matching response, send a thank you message to the user
  //If no valid response was found, send the instructions back to the user.
  if (validResponses.length) {
    responseBody = "Thank you for voting";
  } else {
    responseBody = "This was not a valid choice.  Valid answers are ";
    //Add all valid choices
    surveyResponses.map(function(e) {responseBody += capitalize(e) + ", "});
    //Remove the trailing ", "
    responseBody = responseBody.substr(0, responseBody.length-2);
  }

  //Send an XML response to Twilio (will send a reply to the user)
  res.header('Content-Type', 'text/xml');
  res.send("<?xml version='1.0' encoding='UTF-8' ?><Response><Message>" + responseBody + "</Message></Response>");
});

//GET /results
//Returns the list of data formatted for the C3 chart
app.get("/results", function(req, res) {
  res.json(formattedChartData());
});


//Serve static files from the public_html folder
app.use(express.static(__dirname + "/public_html"));

//Start me up !
app.listen(port);
console.log("Server listening on port " + port);