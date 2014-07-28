define([
	'bublikApp',
	'angular',
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
				scope.changeTopLevel = function(){
					backend.getTopOfCompanies(scope.topLevel, 27, function(topOfCompanies){
						scope.topOfCompanies = topOfCompanies;
						backend.alreadyLoaded();
					});
				};
				scope.changeTopLevel();
				scope.topOfCompanies = storage.topOfCompanies;


				scope.puging = function(){
					backend.loadNextTopOfCompanies(9);
				};
			}
		}
	};
	directive.$inject = ["backend", "storage"];
	app.directive('glxTopcompanies', directive)
});
