define([
	'bublikApp'
], function(app){
	"use strict";

	var directive = function(){
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, c){
				//TODO not a best way for password check
				scope.$watch(attrs.ngModel, function(newVal){
					c.$setValidity('pwmatch', newVal===attrs.pwCheck);
				});

			}
		}
	};
	app.directive('pwCheck', directive)
});

