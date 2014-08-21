define([
	'bublikApp',
	'components/apps/bublik/router',

	//Servicies
	'components/services/dictionary',
	'components/services/backends/common/commonBackend',
	'components/services/backends/user/userBackend',

	//User widgets
	'glx!topmenu',
	'glx!rigthmenu',

	//Utils
	'glx-utils!glxload',

	//Special widgets
	'glx!useralerts',

	//List of main widgets
	'glx!topcompanies',
	'glx!userregistration',
	'glx!login',
	'glx!userinfo'

], function(app){
	"use strict";

	var directive = function(dictionary){
		return {
			restrict: "C",
			templateUrl: '../components/apps/bublik/bublik.html',
			link: function(scope, elm, attrs){
			}
		}
	};
	directive.$inject = ["dictionary"];
	app.directive('glxBublik', directive)
});
