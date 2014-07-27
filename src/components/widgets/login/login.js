define([
	'bublikApp',
	'components/filters/translate',
	'css!components/widgets/login/login.css'
], function(app){
	"use strict";

	var directive = function(backend){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/login/login.html',
			link: function(scope, elm, attrs){
				scope.registration = function(){
					scope.loading = true;
					backend.registration(
						{login: scope.email,
							password: scope.password,
							first_name: scope.firstName,
							last_name: scope.lastName},
						function(){
							backend.redirectTo("/user")
						});
				}

				scope.fieldClass = function(dirty, valid){
					if (!dirty) return '';
					if (valid){
						return 'has-success';
					} else {
						return 'has-error';
					}
				};
			}
		}
	}
	directive.$inject = ["backend"];
	app.directive('glxLogin', directive)
});
