
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
      service: 'Gmail',
      auth: {
          user: 'maorportfolio@gmail.com',
          pass: 'feldi236',
          "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCMHDAIivaaMraR\nxumhZ6Mb83WigtcxqSz3s759FUyjW1Z7zgqYs/dh7nH4Wgm2MOWTveoYuq4qjE/I\n9UAiCk3TFwyPNyytvDnVKgrzuCIs8Hdnz+iK96TSbMLS+tcgBF7LcNcuXRFceZ1D\n36CzcR7CJM/HoIJpbuAVfKsNOLFWSOInzUyBgbaTTG4/O0u/ux7ameL0jkEscfw+\nGQE1anPgAMLuE04A4Yx+tb8Rwa1HNBrQUbhNWdiyFhnkT5Hj6FlfBKUqH5d8vbtd\nnmJpCxKygZ6fT/Waa+1i7i+Pp6LbKWo9/izigr1JegMfPhWT+oe6W6L5pfo9mkMl\nZLXvsC4HAgMBAAECggEAClYSA3wgKspoky/Cqiud6g2RG61EK6yFXe8es6LP0pIf\noTNXSMinpjJHEI4XGIYm8Abn4qC/ziSOLKi0uhr0ftW83kJKkE6W6m9KYfLiYo2J\nR/LomHsiGuJdkd77e9swR+XjmgIEdxDQInyFVURlHOff6qQ57ex5QsLw6e38XZcX\nu7j/0Ms5i3+wsUGIPN4fGTqRsjnJsrw7AMMce7ELLFO9AHObZgxFw1RejbJ87nun\n2gv+CGUCNv4MicrkrxYUjveEmfZZxfMAp8gnxC5KngJmaHKfZzWPb+erFhKUAHMo\ngF0G+GB8p4Ty5d3AaqBTlHE9OBNmUMpMgApSoTQAQQKBgQDA1s80JMFOm/bTpHKL\ne6fsoaifs447BpxpqTJwAWZKrfHlTybdiChLA9vUPczTtr8sQxn/+/x2zbOxUVRf\n3+x6fJChD545PKeObL5JMrD+QIX4WNa4phL2xxhPXCSVaCdxuVHRqnBu73aMjZ/v\npVcyIIRstoqTgaU1FRcM/oWUkQKBgQC6ACclFMUcfEcrnWYJp2OeGrGyERj6Uqz2\nsDIB1kyyv8mJly6SD07hN7m679vNoYn3gVgUFyvPhMPRZrlzBHOj0oAyMnOdhQcw\ny+UZgyAh0J+6dQO4Kom0xJchk2OubLgsIzUrrkiOcPjkvsfxLK025FQ2NrSNgRvE\nTDhBCbkFFwKBgBDpBWSKMJVnId7vVcgbgN9EUdgnU7qjWsX9O1oNFV5JIKQ+K6dT\nkEz7uqRDAxoxtVP5UmdbPolggnhzLFX3+fHHyJsHFpXoVr0rlggvNMwm9liP2cx5\na8JONTiIWQDtEEBtwtoC+zcPMrMinDrUoe/YYCR0YXSL8uPTxKC0FRyxAoGAZLrY\neDh7VyXm1TP0op3IUUNboHep80b67M4XBu+rsdIzrxP04Jzxtv6a0yY6/23Qbf3a\nWWcDDutzsN/U5vkuNzY0vvqbql70ufRyKhLdP/Lfzfa5AO/oi8E7p69OeJPgWebn\nULSeDqYX5Kl9Vps/Y07cXE/cEBYvl2s/u9ksHhkCgYBg+R+8fO8IswdiGg/Thik8\nEm5/LA4sl1o7Wfn7GQkj9mhJMMwmvdHIuo8/r+SyAWakm0Sf/61fjsMcifKDE0On\nvYtUbBqgBpsU7qoos96EW8ggg286C5izQndqHxfM532gi0mjoziw/dlsQLGAdxQO\ng6JYxpo4bb0GCFXFYo+FoQ==\n-----END PRIVATE KEY-----\n"
      }
  });

transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
    let accessToken = userTokens[user];
    if(!accessToken){
        return callback(new Error('Unknown user'));
    }else{
        return callback(null, accessToken);
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
console.log("Its all starts here...");