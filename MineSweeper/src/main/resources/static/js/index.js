$(function() {
	$("#easy-button").click(function(){
		$(".easy").css("display", "block");
		$(".normal").css("display", "none");
		$(".hard").css("display", "none");
		$("#easy-button").css("background-color", "#2c3e50");
		$("#easy-button").css("color", "#fff");
		$("#normal-button").css("background-color", "#fff");
		$("#normal-button").css("color", "#2c3e50");
		$("#hard-button").css("background-color", "#fff");
		$("#hard-button").css("color", "#2c3e50");
	});
});

$(function() {
	$("#normal-button").click(function(){
		$(".easy").css("display", "none");
		$(".normal").css("display", "block");
		$(".hard").css("display", "none");
		$("#easy-button").css("background-color", "#fff");
		$("#easy-button").css("color", "#2c3e50");
		$("#normal-button").css("background-color", "#2c3e50");
		$("#normal-button").css("color", "#fff");
		$("#hard-button").css("background-color", "#fff");
		$("#hard-button").css("color", "#2c3e50");
	});
});

$(function() {
	$("#hard-button").click(function(){
		$(".easy").css("display", "none");
		$(".normal").css("display", "none");
		$(".hard").css("display", "block");
		$("#easy-button").css("background-color", "#fff");
		$("#easy-button").css("color", "#2c3e50");
		$("#normal-button").css("background-color", "#fff");
		$("#normal-button").css("color", "#2c3e50");
		$("#hard-button").css("background-color", "#2c3e50");
		$("#hard-button").css("color", "#fff");
	});
});