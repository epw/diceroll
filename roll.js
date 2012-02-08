var number = 1;
var diff = 6;
var threshold = 0;
var exploding = 11;
var onessubtract = false;
var rerollonessubtract = true;
var results = [];
var successes;
var ones = 0;
var botch_when = "none";

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
	$("#highrollarea").removeClass ("inactive");
	$("#highroll").prop ("disabled", "");
    } else {
	exploding = 11;
	$("#highrollarea").addClass ("inactive");
	$("#highroll").prop ("disabled", "disabled");
    }
}
function update_ones () {
    if ($("#onessubtract").is(":checked")) {
	onessubtract = true;
	$("#rerollonesarea").removeClass ("inactive");
	$("#rerollones").prop ("disabled", "");
    } else {
	onessubtract = false;
	$("#rerollonesarea").addClass ("inactive");
	$("#rerollones").prop ("disabled", "disabled");
    }
}
function update_rerolled_ones () {
    if ($("#rerollones").is(":checked")) {
	rerollonessubtract = true;
    } else {
	rerollonessubtract = false;
    }
}
function update_botches () {
    botch_when = $("#botchtype").val();
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

function roll (times, initial) {
    for (var i = 0; i < times; i++) {
	var rolled = die (10);
	results.push (rolled);
	if (rolled >= exploding) {
	    roll (1, false);
	}
	if (onessubtract) {
	    if (rerollonessubtract || initial) {
		if (rolled == 1) {
		    ones++;
		}
	    }
	}
    }
}

function is_success (value) {
    return value >= diff;
}

function calculate_successes (results) {
    for (r in results) {
	if (is_success (results[r])) {
	    successes++;
	}
    }

    successes -= ones;

    successes -= threshold;

    return successes;
}

function botch () {
    return "<span class=\"botched\">BOTCH!</span>";
}

function calculate_botch (results) {
    switch (botch_when) {
    case "ones":
	if (successes < 0 && results.filter (is_success).length == 0) {
	    return botch ();
	} else {
	    return "";
	}
	break;
    case "negative":
	if (successes < 0) {
	    return botch ();
	} else {
	    return "";
	}
	break;
    case "none":
    default:
	return "";
    }
}    

function wrap_successes (amount) {
    return "<span id=\"successnum\">" + amount + "</span>";
}

function roll_dice () {
    results = [];
    successes = 0;
    ones = 0;
    roll (number, true);
    $("#results").text (output_results (results));
    $("#successes").html ("Successes: "
			  + wrap_successes (calculate_successes (results)));
    $("#botches").html (calculate_botch (results));
}

function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,
				   function(str,key,value) {
				       params[key] = value;
				   });
    
    return params;
}

function init () {
    params = getUrlParams ();

    $("#roll").click (roll_dice);
    $("#save").click (save);

    $("#number").change (update_number);
    $("#difficulty").change (update_diff);
    $("#threshold").change (update_threshold);
    $("#exploding").change (update_exploding);
    $("#highroll").change (update_exploding);
    $("#onessubtract").change (update_ones);
    $("#rerollones").change (update_rerolled_ones);
    $("#botchtype").change (update_botches);

    $("input").each (check_params);
    $("select").each (check_params);
}

$(document).ready (init);
