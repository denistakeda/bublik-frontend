define([
	'bublikApp',
	'components/filters/translate',
	'css!components/widgets/login/login.css'
], function(app){
	"use strict";

	var directive = function(userBackend, commonBackend){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/login/login.html',
			link: function(scope, elm, attrs){
				scope.login = function(){
					scope.waitResponse = true;
					userBackend.login({login: scope.email, password: scope.password, remember_me: scope.rememberMe}, function(response){
						scope.waitResponse = false;
						commonBackend.redirectTo("/user/"+response.id);
					}, function(){
						scope.invalidLogin = true;
						scope.waitResponse = false;
					})
				};

				scope.fieldClass = function(dirty, valid){
					if (!dirty) return '';
					if (valid) {
						return 'has-success';
					} else {
						return 'has-error';
					}
				};

				commonBackend.alreadyLoaded();
			}
		}
	}
	directive.$inject = ["userBackend", "commonBackend"];
	app.directive('glxLogin', directive)
});
