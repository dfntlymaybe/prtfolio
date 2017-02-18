
$(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });

var validatNotEmpty = function(field){
  if(field.val() === ""){
    field.attr('placeholder','Empty field');
    return false;
  }else{
    return true;
  }
};

var validateMail = function(email){
  if(!validatNotEmpty(email)){//email field is empty
    return false;
  }else if(email.val().indexOf('@') > 0 && email.val().indexOf('@') < email.val().length - 1){//valid email
    return true;
  }else{//not valid email
    email.val('');
    email.attr('placeholder','Please enter valid email');
    return false;
  }
};

var main = function(){
	$('form').submit(function(e){
    e.preventDefault();

    $('.email-feedback').empty();

    var validName = validatNotEmpty($('#InputName'));
    var validEmail = validateMail($('#InputEmail'));
    var validSubject = validatNotEmpty($('#InputSubject'));
    var validText = validatNotEmpty($('#Textarea'));

    if(validName && validEmail && validSubject && validText){
      var form = {
        name: $('#InputName').val(),
        email: $('#InputEmail').val(),
        subject: $('#InputSubject').val(),
        text: $('#Textarea').val()
      }
      $('form').hide();
      $('.loader').show();
      $.ajax({
        method: 'POST',
        url: '/mail',
        data: form
      })
        .done(function( msg ) {
          $('.loader').hide();
          $('form').show();
          console.log(msg);
          $('.email-feedback').append(msg);
        });
      return;
    }else{
      $('.email-feedback').append('<p class="error">Please fill out all required fields</p>');
    }




		// if(name === "" || email === "" || subject === "" || myText === ""){
		// 	$('label').css("color", "red");
		// 	$(this).prepend("<p class='error'> Please fill in all required fields(red)</p>");
  //     return false;
		// }else{

  //   }
		
	});
};

$(document).ready(main);