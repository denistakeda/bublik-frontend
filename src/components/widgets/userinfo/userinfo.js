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

				backend.getUserInfo($routeParams.userInfo, function(){
					scope.userInfo = storage.userInfo;
					backend.alreadyLoaded();
				});

			}
		}
	};
	directive.$inject = ["$routeParams","backend", "storage"];
	app.directive('glxUserInfo', directive)
});

