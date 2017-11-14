
// Imports
var express = require('express');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

//Set up
var app = express();

//Middlware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


  
//Set up nodeMailer with my gmail cradentials
var transporter = nodeMailer.createTransport({
  service: "Gmail",
    auth:{
      user: 'sholehmailim@gmail.com',
      pass: 'zxcvb09876'

    }
      // auth: {
      //   type: 'OAuth2',
      //   user: 'mailim@gmail.com',
      //   clientId: '1072681813233-k2o7dvuobe104el1dt0fksmqbcnaul66.apps.googleusercontent.com',
      //   clientSecret: 'MO4PCf2NTRsC23_dCAafRSg-',
      //   access_token:"ya29.GlsCBWnC_RjIiOS6leBq86TNvUq2hPHOH6Cti0-iqLa6mcp_KPJhkJE2f-h9d67PZKgATW-bJUAaDtMF3Dod9pXUfc5jNR1WEa_uGSYilMG5LvbqwoI20KRZ0ctC",
      //   refresh_token:"1/NLf6mAbiV_x_pirnm0ExYp5o6dPWaBG8V_B6vQNafx4",
      //   expiry_date:1510529637064
      // }
});

// transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
//     var accessToken = userTokens[user];
//     if(!accessToken){
//         return callback(new Error('Unknown user'));
//     }else{
//         return callback(null, accessToken);
//     }
// });
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
      from: 'sholehmailim@gmail.com', // sender address
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
console.log("Its all starts here...");