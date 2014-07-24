define([
	'bublikApp',
	'components/apps/bublik/router',
	//User widgets
	'glx!topmenu',
	'glx!header',
	'glx!rigthmenu',


	//List of main widgets
	'glx!topcompanies',
	'glx!userregistration'

], function(app){
	"use strict";

	var directive = function(/*storage, Request, backend, config*/){
		return {
			restrict: "C",
			templateUrl: '../components/apps/bublik/bublik.html',
			link: function(scope, elm, attrs){
				/*scope.storage=storage;

				 backend.getSupportedFeatures();

				 scope.facetsSupported = function(){
				 return config.get("supportedFeatures").facets;
				 }*/
			}
		}
	}
	//directive.$inject = ["ibxStorage", "Request", "ibxBackend", "ibxConfig"];
	app.directive('glxBublik', directive)
});
