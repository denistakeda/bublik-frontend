define([
	'bublikApp',
	'angular',
	'css!components/widgets/userinfo/userinfo.css'
], function(app){
	"use strict";

	var directive = function(backend, storage){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userinfo/userinfo.html',
			link: function(scope, elm, attrs){
				backend.alreadyLoaded();
			}
		}
	}
	directive.$inject = ["backend", "storage"];
	app.directive('glxUserInfo', directive)
});

