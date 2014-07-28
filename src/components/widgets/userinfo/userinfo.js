define([
	'bublikApp',
	'angular',
	'css!components/widgets/userinfo/userinfo.css'
], function(app){
	"use strict";

	var directive = function($routeParams, backend, storage){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userinfo/userinfo.html',
			link: function(scope, elm, attrs){
				scope.userInfo = storage.userInfo;

				backend.getUserInfo($routeParams.userInfo, function(){
					backend.alreadyLoaded();
				});
			}
		}
	}
	directive.$inject = ["$routeParams","backend", "storage"];
	app.directive('glxUserInfo', directive)
});

