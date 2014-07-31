define([
	'bublikApp',
	'components/filters/translate',
	'glx!userregistration-ensureunique',
	'glx!userregistration-pwcheck',
	'css!components/widgets/userregistration/userregistration.css'
], function(app){
	"use strict";

	var directive = function(backend){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userregistration/userregistration.html',
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
					if (valid) {
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
	app.directive('glxUserRegistration', directive)
});
