if (window.DeviceOrientationEvent) {
	window.addEventListener("deviceorientation", throttle(function(event) {
		updateMenuPosition(event);
    outputDebug(event);
	}, 1400), false);
} else {
	console.log("DeviceOrientationEvent is not supported");
}

var wrap = document.getElementById('wrap');
let alphaDebug = document.getElementById('alpha');
let betaDebug = document.getElementById('beta');
let gammaDebug = document.getElementById('gamma');

var gamma;
// initial Position
var position = ['left', 'right'];
let currentPosition = checkHand();
let threshold = 1400;


function outputDebug(event) {
	console.log(`Alpha: ${event.alpha} -- Beta: ${event.beta} -- Gamma:${event.gamma}`);
	alphaDebug.innerHTML = event.alpha ? event.alpha.toFixed(2) : 0;
	betaDebug.innerHTML = event.beta ? event.beta.toFixed(2) : 0;
	gammaDebug.innerHTML = event.gamma ? event.gamma.toFixed(2) : 0;
}

function updateMenuPosition(event) {
  console.log('Updating position' + checkHand(event.gamma));
  console.log(`currentPosition: ${currentPosition} -- nextPosition:${checkHand(event.gamma)}`);

	if (currentPosition != checkHand(event.gamma)) {
		wrap.classList.remove(currentPosition);
		wrap.classList.add(checkHand(event.gamma));
    currentPosition = checkHand(event.gamma);
	}
}

function checkHand(gamma) {
	if (gamma > 0) {
		return position[0];
	}
	return position[1];
}

function throttle(fn, threshhold, scope) {
	console.log('Throttle');
	threshhold || (threshhold = 250);
	var last,
		deferTimer;
	return function() {
		var context = scope || this;

		var now = +new Date,
			args = arguments;
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer);
			deferTimer = setTimeout(function() {
				last = now;
				fn.apply(context, args);
			}, threshhold);
		} else {
			last = now;
			fn.apply(context, args);
		}
	};
}
