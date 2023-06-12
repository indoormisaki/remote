$(function() {
	$("#easy-button").click(function(){
		$(".easy").css("display", "block");
		$(".normal").css("display", "none");
		$(".hard").css("display", "none");
	});
});

$(function() {
	$("#normal-button").click(function(){
		$(".easy").css("display", "none");
		$(".normal").css("display", "block");
		$(".hard").css("display", "none");
	});
});

$(function() {
	$("#hard-button").click(function(){
		$(".easy").css("display", "none");
		$(".normal").css("display", "none");
		$(".hard").css("display", "block");
	});
});