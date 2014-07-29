define([
	'bublikApp',
	'angular',
	'css!components/widgets/editablefield/editablefield.css'
], function(app){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/editablefield/editablefield.html',
			scope:{
				glxModel: "=",
				glxOnChange: "="
			},
			link: function(scope, elm, attrs){

			}
		}
	};
	directive.$inject = [];
	app.directive('glxEditableField', directive)
});

