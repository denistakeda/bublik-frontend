define([
	'bublikApp',
	'components/filters/translate',
	'css!components/widgets/userinfo/avatar/userinfo-avatar.css'
], function(app){
	"use strict";

	var directive = function(backend, $modalInstanse){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userinfo/avatar/userinfo-avatar.html',
			link: function(scope, elm, attrs){
				scope.ok = function(){
					console.log("ok");
					$modalInstance.close();
				}
			}
		}
	}
	directive.$inject = ["backend", "$modalInstanse"];
	app.directive('glxUserAvatar', directive)
});