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
				backend.getTopOfCompanies(scope.topLevel,10);
				scope.topOfCompanies = storage.topOfCompanies;

                scope.$watch("topLevel", function(newVal, oldVal){
                    if (!newVal || newVal===oldVal) return;
                    backend.getTopOfCompanies(scope.topLevel,10);
                });

				scope.puging = function(){
                    backend.loadNextTopOfCompanies();
                };
			}
		}
	};
	directive.$inject = ["backend", "storage"];
	app.directive('glxTopcompanies', directive)
});
