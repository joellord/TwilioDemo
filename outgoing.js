var accountSid = 'ACc584e64133bc4a0f09988237887d7a7e'; 
var authToken = '284c80807f6b9a8b3a8d358831ba582d'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
  to: "+18193192095", 
  from: "+18194102910", 
  body: "test",   
}, function(err, message) { 
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log(message.sid); 
  }
});
