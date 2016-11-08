
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

var main = function(){
	$('form').submit(function (){
		var name = $('#InputName').val();
		var email = $('#InputEmail').val();
		var subject = $('InputSubject').val();
		var myText = $('#Textarea').val();
		if(name === "" || email === "" || subject === "" || myText === ""){
			$('label').css("color", "red");
			$(this).prepend("<p> Please fill in all required fields(red)</p>");
		}
		return false;
	});
};

$(document).ready(main);