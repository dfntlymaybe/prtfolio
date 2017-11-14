
// Imports
var express = require('express');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');
var config = require('./config');

//Set up
var app = express();

//Middlware
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set up nodeMailer with my gmail cradentials
var transporter = nodeMailer.createTransport({
  service: "Gmail",
    auth:{
      user: config.sender.user,
      pass: config.sender.pass

    }

});

//Sending HTML on first GET
app.get('/', function (req, res) {
  // res.sendFile("/public/index.html");
});

//Send email with the form
app.post('/mail', function(req, res){

  var message = 
  'sender: ' + req.body.name + 
  '\neMail: ' + req.body.email + 
  '\nmessage: ' + req.body.text;

  var mailOptions = {
      from: config.sender.user, // sender address
      to: config.receiver.user, // list of receivers
      subject: 'New portfolio web message: ' + req.body.subject, // Subject line
      text: message //, // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.send('<p class="error">Ooops something went wrong please try again later</p>');
    }else{
      console.log('Message sent: ' + info.response);
      res.send('<p class="success">Message sent succesfuly</p>');
    }
  });
});

app.listen(process.env.PORT || '5000');
console.log("Its all starts here...");