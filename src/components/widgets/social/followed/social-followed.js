define([
	'bublikApp',
	'glx!social-preview',
	'css!components/widgets/social/followed/social-followed.css'
], function(app){
	"use strict";

	var directive = function(commonBackend){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/social/followed/social-followed.html',
			scope: {
				glxFollowed: '='
			},
			link: function(scope){
				scope.toFollowed = function(followed){
					commonBackend.redirectTo("user/" + followed.id);
				};
			}
		}
	};
	directive.$inject = ["commonBackend"];
	app.directive('glxSocialFollowed', directive)
});