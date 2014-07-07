"use strict";

require.config({
	baseUrl:"",
	paths: {
		angular: 'libs/angular/1_2_12/angular.min',
		jQuery: 'libs/jquery/some_version/jquery.min',
		'bootstrap':'libs/bootstrap_js/some_version/bootstrap.min',
		css: 'libs/css_js/some_version/css'
	},

	shim: {
		'jQuery': { exports: '$'},
		'angular': {deps: ['jQuery'], exports: 'angular'},
		'bootstrap': {deps: ['jQuery','css!libs/bootstrap_css/some_version/bootstrap.min.css', 'css!libs/bootstrap_css/some_version/bootstrap-theme.min.css']}
	},
	waitSeconds: 120

});



define(['app', 'widgets/smarthome/smarthome'], function(app){
    angular.bootstrap(document, ['Application']);
});
