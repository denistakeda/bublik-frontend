define([
	'bublikApp',
	'angular',
	'components/servicies/storage',
	'components/servicies/backend',
	'angular-infinite-scroll',
	'glx!topcompanies-topitem',
	'css!components/widgets/topcompanies/topcompanies.css'
], function(app){
	"use strict";

	var directive = function(backend, storage){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/topcompanies/topcompanies.html',
			link: function(scope, elm, attrs){
                scope.topLevel = 'city';
				backend.getTopOfCompanies(scope.topLevel,27);
				scope.topOfCompanies = storage.topOfCompanies;

                scope.changeTopLevel = function(){
                    backend.getTopOfCompanies(scope.topLevel,27);
                };

				scope.puging = function(){
                    backend.loadNextTopOfCompanies(9);
                };
			}
		}
	};
	directive.$inject = ["backend", "storage"];
	app.directive('glxTopcompanies', directive)
});
