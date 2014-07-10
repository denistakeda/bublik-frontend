define([
	"ibxApp"
], function(app){
	"use strict";
	app.filter("normalizePropertyName", function(){
		return function(name, label){
			if (label) return label;
			var out = name;
			if (~out.indexOf("plm.details.")) {
				out = out.replace("plm.details.", "");
			} else {
				out = out.replace("plm.", "").replace(/^[^.]+\.[^.]+\./, ""); // plm.tenant.workspace
			}
			out = out.replace(".", " ");
			out = out.charAt(0).toUpperCase() + out.slice(1);   // capitalize first letter
			return out;
		}
	});
});