define([
	'bublikApp',
	'angular',
	'glx-utils!editablefield',
	'css!components/widgets/userinfo/userinfo.css'
], function(app){
	"use strict";

	var directive = function($routeParams, backend, storage){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userinfo/userinfo.html',
			link: function(scope, elm, attrs){
				scope.showAlert = function(message){
					console.log(message);
				}

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

