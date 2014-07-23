define([
	'bublikApp'
], function(app){
	"use strict";

	var directive = function(backend){
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl){
				ctrl.$parsers.unshift(function(viewValue){
					backend.isEmailUnique(viewValue, function(){
						ctrl.$setValidity('unique', true);
					}, function(){
						ctrl.$setValidity('unique', false);
					});
					return viewValue;
				});
			}
		}
	}
	directive.$inject = ["backend"];
	app.directive('glxEnsureUnique', directive)
});
