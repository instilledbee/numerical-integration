// Attach event handlers to various page elements.
$(document).ready(function() {
	$("#compute").click(function() {
		// Some temporary variables
		var hCoeff, a, b, i, n, res, totals, error, algo;
		
		res = new Array();
		totals = new Array();
		error = new Array();
		
		// Get data from input
		n = parseInt($("#count").val());
		a = parseInt($("#intA").val());
		b = parseInt($("#intB").val());
		algo = $("#algo").val();
		
		//error[0] = 0.00;
		
		// Compute results
		for(i = 1; i <= n; i++) {
			//console.log("Solving for T sub " + i);
			
			// Select proper algorithm to use
			if(algo == "Trapezoidal Rule") {
				totals[i - 1] = getHCoTrapezoid(a, b, i) * getTrapezoidSum(a, b, i);
			}
			
			else if(algo == "Left Endpoint") {
				totals[i - 1] = getHCoEndpoint(a, b, i) * getLeftSum(a, b, i);
			}
			
			else if(algo == "Right Endpoint") {
				totals[i - 1] = getHCoEndpoint(a, b, i) * getRightSum(a, b, i);
			}
			// Percent error
			/*
			if(i > 1) {
				error[i - 1] = parseFloat(Math.abs(totals[i - 1] - totals[i - 2]) / Math.abs(totals[i - 1]));
			}*/
		}
		
		// Reset results table
		$("#results-rows").empty();
		
		// Populate results table
		
		for(i = 1; i <= n; i += 1) {
			$("#results-rows").append("<tr><td>" + i + "</td><td>" + totals[i - 1] + "</td></tr>");
		}
	});
});

/* ======================
		Common functions
====================== */

// Get the (b - a / 2n) part of the formula
function getHCoTrapezoid(a, b, n) {
	return parseFloat((b - a) / (2 * n));
}

// Get the (b - a / n) part of the formula
function getHCoEndpoint(a, b, n) {
	return parseFloat((b - a) / n);
}

// Compute for the summation of e^x^2, for a certain interval count n
// For trapezoidal rule
function getTrapezoidSum(a, b, n) {
	var intervalSize, total, i;
	
	// intervalSize = parseFloat((b - a) / n);
	total = 0;
	// total = Math.exp(Math.pow(a, 2)) + Math.exp(Math.pow(b, 2));
	
	for(i = 1; i <= n; i++) {
		total += Math.exp(Math.pow(parseFloat((i - 1) / n), 2)) + Math.exp(Math.pow(parseFloat(i / n), 2));
		//total += Math.exp(Math.pow(a + (i * intervalSize), 2)) * 2;
	}
	
	return total;
}

// For left endpoint approximation
function getLeftSum(a, b, n) {
	var total, i;

	total = 0;
	
	for(i = 1; i <= n; i++) {
		total += Math.exp(Math.pow(parseFloat((i - 1) / n), 2));
	}
	
	return total;
}

// For right endpoint approximation
function getRightSum(a, b, n) {
	var total, i;

	total = 0;
	
	for(i = 1; i <= n; i++) {
		total += Math.exp(Math.pow(parseFloat(i / n), 2));
	}
	
	return total;
}