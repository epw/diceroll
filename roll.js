var number = 1;
var diff = 6;
var threshold = 0;
var exploding = 11;
var onessubtract = false;
var rerollonessubtract = true;

function die (sides) {
    return Math.ceil (Math.random () * sides);
}

function output_results (results) {
    var output = "";

    for (r in results) {
	output += results[r];
	if (r < results.length - 1) {
	    output += ", ";
	}
    }
    return output;
}

function roll () {
    var results = [];
    for (var i = 0; i < number; i++) {
	var rolled = die (10);
	results.push (rolled);
    }

    $("#results").text (output_results (results));
}

function init () {
    $("#roll").click (roll);

    number = $("#number").val ();
    diff = $("#difficulty").val ();
    threshold = $("#threshold").val ();
    if (
    exploding = $("#
}

$(document).ready (init);
