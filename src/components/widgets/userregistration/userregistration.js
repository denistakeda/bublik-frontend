define([
	'bublikApp',
	'components/filters/translate',
	'css!components/widgets/userregistration/userregistration.css'
], function(app){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userregistration/userregistration.html',
			link: function(scope, elm, attrs){
			}
		}
	}
	//directive.$inject = ["ibxStorage", "Request", "ibxBackend", "ibxConfig"];
	app.directive('glxUserRegistration', directive)
});
