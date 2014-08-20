define([
	'bublikApp',
	'glx!social-preview',
	'css!components/widgets/social/followers/social-followers.css'
], function(app){
	"use strict";

	var directive = function(commonBackend){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/social/followers/social-followers.html',
			scope: {
				glxFollowers: '='
			},
			link: function(scope){
				scope.toFollowers = function(follower){
					commonBackend.redirectTo("user/" + follower.id);
				};
			}
		}
	};
	directive.$inject = ["commonBackend"];
	app.directive('glxSocialFollowers', directive)
});