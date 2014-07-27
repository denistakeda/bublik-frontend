define([
	// Standard Libs
	'angular',		// lib/angular/angular
	'angular-resource',
	'angular-infinite-scroll',
	'angular-route',
	'angular-spinner',
	'angular-ui',
	'angular-cookies'
	//'ui-utils',
	//'ui-date',
	//'angular-sanitize'
], function(angular){
	"use strict";

	var app = angular.module('Application', ['ngResource', 'ngRoute', 'infinite-scroll', 'angularSpinner', 'ui.bootstrap', 'ngCookies']);
//	var app = angular.module('Application', ["ui.utils", "ngSanitize", "ui.date"]).value("$anchorScroll",angular.noop);
//	app.config( ['$httpProvider', function($httpProvider) {
//		var addXSRFcookie = function(){
//			var c = document.cookie.replace(/.*xsrf_security=([^;]+)(;|$)., "$1");
//			if (c === document.cookie) c = "";
//			if (!$httpProvider.defaults.headers.post) $httpProvider.defaults.headers.post = {};
//			$httpProvider.defaults.headers.post['X-XSRF-Security'] = c;
//			if (!$httpProvider.defaults.headers.put) $httpProvider.defaults.headers.put = {};
//			$httpProvider.defaults.headers.put['X-XSRF-Security'] = c;
//			if (!$httpProvider.defaults.headers["delete"]) $httpProvider.defaults.headers["delete"] = {};
//			$httpProvider.defaults.headers["delete"]['X-XSRF-Security'] = c;
//		}
//
//		$httpProvider.responseInterceptors.push(function() {
//			return function(promise) {
////				addXSRFcookie();
//				return promise;
//			}
//		});
////		addXSRFcookie();
//	}]);
	app.run(["$rootScope", function($rootScope){
		$rootScope.applicationReady = true;
		$rootScope.localizationLoading = true;
		$rootScope.isResourceLoading = function(){
			return $rootScope.loading || $rootScope.localizationLoading;
		}
	}]);
//
//	// Prevent the backspace key from navigating back.
//	angular.element(document).unbind('keydown').bind('keydown', function (event) {
//		var doPrevent = false;
//		if (event.keyCode === 8) {
//			var d = event.srcElement || event.target;
//			if ((d.tagName.toUpperCase() === 'INPUT' && (d.type.toUpperCase() === 'TEXT' || d.type.toUpperCase() === 'PASSWORD' || d.type.toUpperCase() === 'FILE')) || d.tagName.toUpperCase() === 'TEXTAREA') {
//				doPrevent = d.readOnly || d.disabled;
//			}
//			else {
//				doPrevent = true;
//			}
//		}
//		if (doPrevent) {
//			event.preventDefault();
//		}
//	});
//
//	if(window.navigator.userAgent.indexOf("MSIE")>-1){
//		angular.element(document).on("keypress","input",function(event){
//			if(event.keyCode==13){
//				event.preventDefault();
//			}
//		})
//	}
	return app;
});
