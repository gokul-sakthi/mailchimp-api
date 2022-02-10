// jshint esversion : 6
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address : email,
        status: "subscribed",
        merge_fields: {
          "FNAME" : firstName,
          "LNAME" : lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    "url":"MAILCHIMP HEADER URL",
    method:"POST",
    headers: {
      "Authorization" : "AUTH HEADER TOKEN"
    },
    body: jsonData

  };

  request(options, function(error, response, body) {
    if(error) {
      res.sendFile(__dirname + "/failure.html");
    } else if(response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
  });


  console.log(firstName + " " + lastName + " " + email);
});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Sever running on port 3000");
})











// lockness mail list id
// 24a5718b5c

// Api Key for mailchimp
// 172e1b96cf7bc08eb6e942c30445e45c-us4
