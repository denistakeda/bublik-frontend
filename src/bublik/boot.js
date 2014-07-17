"use strict";

require.config({
	baseUrl: '../',
	paths: {
		angular: 'libs/angular/1.2.13/angular.min',
		"ui-utils": "libs/ui-utils-0.1.1/ui-utils.min",
		"ui-date": "libs/ui-date/src/date",
		jquery: 'libs/jquery/jquery.min',
		jQueryUI: 'libs/jquery/jquery-ui.min',
		'bootstrap':'libs/bootstrap/dist/js/bootstrap.min',

		'angular-sanitize': 'libs/angular/1.2.13/angular-sanitize.min',
		'angular-resource': 'libs/angular/1.2.13/angular-resource.min',
		'angular-animate': 'libs/angular/1.2.13/angular-animate.min',
		'angular-touch': 'libs/angular/1.2.13/angular-touch.min',
        'angular-route': 'libs/angular/1.2.13/angular-route.min'
	},

	shim: {
		'angular-sanitize': { deps: ['angular']},
		'angular-resource': { deps: ['angular']},
		'angular-animate': { deps: ['angular']},
		'angular-touch': { deps: ['angular']},
        'angular-route': { deps: ['angular']},

		"ui-utils": {
			deps: ["angular"]
		},
		"ui-date": {
			deps: ["angular", "jQueryUI"]
		},
		'jquery': { exports: '$'},
		'jQueryUI': { deps: ['jquery', 'css!libs/jquery/smoothness/jquery-ui.css', 'css!libs/jquery/smoothness/jquery-ui-dd.min.css'], exports: '$.ui'},
		'angular': {deps: ['jquery', 'jQueryUI'], exports: 'angular'},
		'bootstrap': {deps: ['jquery','css!libs/bootstrap/dist/css/bootstrap.min.css']}
	},
	waitSeconds: 120,
	urlArgs: '@@version'
});

require(["angular", "bublik-widget-pack"], function(angular, glxPack){
	/*var requiredModules = glxPack({}, function(){
		angular.bootstrap(document, requiredModules);
	});*/

	glxPack({}, function(){
		angular.bootstrap(document, ['Application']);
	});
});
