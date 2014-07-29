define([
	'bublikApp',
	'angular',
	'css!components/utils/editablefield/editablefield.css'
], function(app){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			templateUrl: '../components/utils/editablefield/editablefield.html',
			required: "glxModel",
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

