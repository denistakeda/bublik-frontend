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
				backend.getTopOfCompanies("city",50);
				scope.topOfCompanies = storage.topOfCompanies;
				scope.puging = function(){backend.loadNextTopOfCompanies();};
			}
		}
	};
	directive.$inject = ["backend", "storage"];
	app.directive('glxTopcompanies', directive)
});
