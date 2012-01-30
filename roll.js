var number = 1;
var diff = 6;
var threshold = 0;
var exploding = 11;
var onessubtract = false;
var rerollonessubtract = true;
var results = [];

var params;

function die (sides) {
    return Math.ceil (Math.random () * sides);
}

function update_number () {
    number = $("#number").val ();
}
function update_diff () {
    diff = $("#difficulty").val ();
}
function update_threshold () {
    threshold = $("#threshold").val ();
}
function update_exploding () {
    if ($("#exploding").is(":checked")) {
	exploding = parseInt ($("#highroll").val());
    } else {
	exploding = 11;
    }
}
function update_ones () {
    if ($("#onessubtract").is(":checked")) {
	onessubtract = true;
    } else {
	onessubtract = false;
    }
}
function update_rerolled_ones () {
    if ($("#rerollones").is(":checked")) {
	rerollonessubtract = true;
    } else {
	rerollonessubtract = false;
    }
}

function check_params () {
    if (params.hasOwnProperty ($(this).attr ("id"))) {
	if ($(this).prop ("type") == "checkbox") {
	    $(this).prop ("checked", params[$(this).attr ("id")]);
	} else {
	    $(this).val (params[$(this).attr ("id")]);
	}
	$(this).change ();
    }
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

function roll (times) {
    for (var i = 0; i < times; i++) {
	var rolled = die (10);
	results.push (rolled);
	if (rolled >= exploding) {
	    roll (1);
	}
    }
}

function roll_dice () {

    results = [];
    roll (number);
    $("#results").text (output_results (results));
}

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
        params[key] = value;
    });
    
    return params;
}

function init () {
    params = getUrlParams ();

    $("#roll").click (roll_dice);

    $("#number").change (update_number);
    $("#difficulty").change (update_diff);
    $("#threshold").change (update_threshold);
    $("#exploding").change (update_exploding);
    $("#highroll").change (update_exploding);
    $("#onessubtract").change (update_ones);
    $("#rerollones").change (update_rerolled_ones);

    $("input").each (check_params);

}

$(document).ready (init);
