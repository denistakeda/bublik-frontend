define([
	'bublikApp',
	'components/filters/translate'
	//'css!components/widgets/setAccessToken/setAccessToken.css'
], function(app){
	"use strict";

	var directive = function(backend){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/login/login.html',
			link: function(scope, elm, attrs){
				scope.login = function(){
					scope.waitResponse = true;
					backend.login({login: scope.email, password: scope.password}, function(){
						scope.waitResponse = false;
						backend.redirectTo("#/user")
					}, function(){
						scope.invalidLogin = true;
						scope.waitResponse = false;
					})
				};

				scope.fieldClass = function(dirty, valid){
					if (!dirty) return '';
					if (valid){
						return 'has-success';
					} else {
						return 'has-error';
					}
				};

				backend.alreadyLoaded();
			}
		}
	}
	directive.$inject = ["backend"];
	app.directive('glxLogin', directive)
});
