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