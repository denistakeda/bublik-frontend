define([
	'bublikApp',
	'components/apps/bublik/router',

	//User widgets
	'glx!topmenu',
	'glx!header',
	'glx!rigthmenu',


	//List of main widgets
	'glx!topcompanies',
	'glx!userregistration',
	'glx!login'

], function(app){
	"use strict";

	var directive = function(/*storage, Request, backend, config*/){
		return {
			restrict: "C",
			templateUrl: '../components/apps/bublik/bublik.html',
			link: function(scope, elm, attrs){
			}
		}
	};
	app.directive('glxBublik', directive)
});
