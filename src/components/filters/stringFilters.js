define([
	'ibxApp',
	'angular'
], function(app, angular){
	"use strict";

	/**
	 * @global Math, isNaN, isFinite
	 */
	app.filter('bytes', function() {
		return function(bytes, precision) {
			if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
			if (typeof precision === 'undefined') precision = 1;
			var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
				number = Math.floor(Math.log(bytes) / Math.log(1024));
			return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
		}
	});

	//HTML ENTITIES FILTER
	app.filter("htmlentities", function() {

		return function(text,type) {
			text=text||'';
			var div = document.createElement('div');
			var t = document.createTextNode(text);
			div.appendChild(t);
			return String(div.innerHTML).replace(/"/g, '&quot;');
		}
	});

	var cropFilter=function() {
		return function(text, symbols) {
			symbols = symbols || 100;
			if (text.length > symbols) {
				text = text.substr(0, symbols - 3) + "...";
			}
			return text;
		}
	}

	cropFilter.$inject=[];
	app.filter("crop", cropFilter);

});