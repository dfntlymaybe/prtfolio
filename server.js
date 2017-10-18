
// Imports
var express = require('express');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

//Set up
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'maorportfolio@gmail.com',
            pass: 'feldi236'
        }
    });


//Handlers

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
      from: 'maorportfolio@gmail.com', // sender address
      to: 'rounder236@gmail.com', // list of receivers
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