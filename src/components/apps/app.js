define([
	// Standard Libs
	'angular',		// lib/angular/angular
	'angular-resource',
	'angular-infinite-scroll',
	'angular-route',
	'angular-spinner',
	'angular-ui',
	'angular-cookies',
	//'angular-animate',
	'ui-utils'
	//'ui-utils',
	//'ui-date',
	//'angular-sanitize'
], function(angular){
	"use strict";

	var app = angular.module('Application', ['ngResource', 'ngRoute', 'infinite-scroll', 'angularSpinner', 'ui.bootstrap',
											 'ngCookies', 'ui.utils']);
	//Enable angular-animate only for element with class angular-animate

	app.run(["$rootScope", function($rootScope){
		$rootScope.applicationReady = true;
		$rootScope.localizationLoading = true;
		$rootScope.isResourceLoading = function(){
			return $rootScope.loading || $rootScope.localizationLoading;
		}
	}]);

	return app;
});
