define([
	'bublikApp'
], function(app){
	"use strict";

	var directive = function(userBackend){
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl){
				ctrl.$parsers.unshift(function(viewValue){
					userBackend.isEmailUnique(viewValue, function(){
						ctrl.$setValidity('unique', true);
					}, function(){
						ctrl.$setValidity('unique', false);
					});
					return viewValue;
				});
			}
		}
	}
	directive.$inject = ["userBackend"];
	app.directive('glxEnsureUnique', directive)
});
