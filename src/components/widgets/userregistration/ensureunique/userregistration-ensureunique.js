define([
	'bublikApp'
], function(app){
	"use strict";

	var directive = function(commonBackend){
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl){
				ctrl.$parsers.unshift(function(viewValue){
					commonBackend.isEmailUnique(viewValue, function(){
						ctrl.$setValidity('unique', true);
					}, function(){
						ctrl.$setValidity('unique', false);
					});
					return viewValue;
				});
			}
		}
	}
	directive.$inject = ["commonBackend"];
	app.directive('glxEnsureUnique', directive)
});
