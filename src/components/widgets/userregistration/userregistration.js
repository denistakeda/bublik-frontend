define([
	'bublikApp',
	'components/filters/translate',
	'glx!userregistration-ensureunique',
	'glx!userregistration-pwcheck',
	'css!components/widgets/userregistration/userregistration.css'
], function(app){
	"use strict";

	var directive = function(commonBackend, userBackend){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/userregistration/userregistration.html',
			link: function(scope, elm, attrs){
				scope.registration = function(){
					scope.loading = true;
					userBackend.registration(
						{login: scope.email,
							password: scope.password,
							first_name: scope.firstName,
							last_name: scope.lastName},
						function(){
							userBackend.getMenu();
							userBackend.redirectTo("/user")
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

				commonBackend.alreadyLoaded();
			}
		}
	}
	directive.$inject = ["commonBackend","userBackend"];
	app.directive('glxUserRegistration', directive)
});
