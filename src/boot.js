"use strict";

require.config({
	baseUrl: './',
	paths: {
		angular: 'libs/angular/1.2.13/angular.min',
		"ui-utils": "libs/ui-utils-0.1.1/ui-utils.min",
		"ui-date": "libs/ui-date/src/date",
		jquery: 'libs/jquery/jquery.min',
		jcrop: 'libs/jcrop/0.9.12/jquery.Jcrop.min',
		jQueryUI: 'libs/jquery/jquery-ui.min',
		'bootstrap':'libs/bootstrap/dist/js/bootstrap.min',
		'spin': 'libs/spin.min',

		'angular-resource': 'libs/angular/1.2.13/angular-resource.min',
		'angular-animate': 'libs/angular/1.2.13/angular-animate.min',
		'angular-infinite-scroll': 'libs/angular/1.2.13/ng-infinite-scroll.min',
		'angular-route': 'libs/angular/1.2.13/angular-route.min',
		'angular-spinner':'libs/angular/1.2.13/angular-spinner.min',
		'angular-ui': 'libs/angular/1.2.13/ui-bootstrap-tpls.min',
		'angular-cookies': 'libs/angular/1.2.13/angular-cookies.min'
	},

	shim: {
		'angular-resource': { deps: ['angular']},
		'angular-animate': { deps: ['angular']},
		'angular-infinite-scroll': { deps: ['angular']},
		'angular-route': { deps: ['angular']},
		'angular-spinner': { deps: ['angular', 'spin']},
		'angular-ui': {deps: ['angular', 'bootstrap']},
		'angular-cookies': { deps: ['angular']},

		"ui-utils": {
			deps: ["angular"]
		},
		"ui-date": {
			deps: ["angular", "jQueryUI"]
		},
		'jquery': { exports: '$'},
		'jcrop': {deps: ['jquery', 'css!libs/jcrop/0.9.12/jquery.Jcrop.min.css']},
		'jQueryUI': { deps: ['jquery', 'css!libs/jquery/smoothness/jquery-ui.css', 'css!libs/jquery/smoothness/jquery-ui-dd.min.css'], exports: '$.ui'},
		'angular': {deps: ['jquery', 'jQueryUI'], exports: 'angular'},
		'bootstrap': {deps: ['jquery','css!libs/bootstrap/dist/css/bootstrap.min.css']}
	},
	waitSeconds: 120,
	urlArgs: '@@version'
});

require(["angular", "bublik-widget-pack"], function(angular, glxPack){

	glxPack({}, function(){
		angular.bootstrap(document, ['Application']);
	});
});
