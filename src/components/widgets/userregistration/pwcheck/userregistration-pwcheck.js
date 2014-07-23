define([
	'bublikApp'
], function(app){
	"use strict";

	var directive = function(){
		return {
			require: 'ngModel',
			scope: {pwCheck: "="},
			link: function(scope, elm, attrs, ctrl){
				//TODO not a best way for password check
				/*scope.$watch(attrs.ngModel, function(newVal){
				 c.$setValidity('pwmatch', newVal===attrs.pwCheck);
				 });*/
				ctrl.$parsers.unshift(function(viewValue){
					if (viewValue === scope.pwCheck) {
						ctrl.$setValidity('pwmatch', true);
						return viewValue;
					} else {
						ctrl.$setValidity('pwmatch', false);
						return undefined
					}
				});
			}
		}
	};
	app.directive('pwCheck', directive)
});

