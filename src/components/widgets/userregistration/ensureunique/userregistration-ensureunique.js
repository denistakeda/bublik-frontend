define([
	'bublikApp'
], function(app){
	"use strict";

	var directive = function(backend){
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, c){
				scope.$watch(attrs.ngModel, function(){
					if (!attrs.glxEnsureUnique || !attrs.glxEnsureUnique === '') return;
					backend.isEmailUnique(attrs.glxEnsureUnique, function(){
						c.$setValidity('unique', true);
					}, function(){
						c.$setValidity('unique', false);
					});
				});
			}
		}
	}
	directive.$inject = ["backend"];
	app.directive('glxEnsureUnique', directive)
});
