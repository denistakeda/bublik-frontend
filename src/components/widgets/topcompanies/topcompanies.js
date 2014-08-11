define([
	'bublikApp',
	'angular',
	'glx!topcompanies-topitem',
	'css!components/widgets/topcompanies/topcompanies.css'
], function(app){
	"use strict";

	var directive = function(commonBackend, userBackend, storage){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/topcompanies/topcompanies.html',
			link: function(scope, elm, attrs){
				scope.topLevel = 'city';
				scope.changeTopLevel = function(){
					userBackend.getTopOfCompanies(scope.topLevel, 27, function(topOfCompanies){
						scope.topOfCompanies = topOfCompanies;
						commonBackend.alreadyLoaded();
					});
				};
				scope.changeTopLevel();
				scope.topOfCompanies = storage.topOfCompanies;


				scope.puging = function(){
					userBackend.loadNextTopOfCompanies(9);
				};
			}
		}
	};
	directive.$inject = ["commonBackend", "userBackend", "storage"];
	app.directive('glxTopcompanies', directive)
});
