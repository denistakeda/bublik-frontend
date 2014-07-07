"use strict";

require.config({
	baseUrl:"",
	paths: {
		angular: 'libs/angular.min',
		jQuery: 'libs/jquery.min',
		'bootstrap':'libs/bootstrap.min',
		css: 'libs/css'
	},

	shim: {
		'jQuery': { exports: '$'},
		'angular': {deps: ['jQuery'], exports: 'angular'},
		'bootstrap': {deps: ['jQuery','css!libs/bootstrap.min.css', 'css!libs/bootstrap-theme.min.css']}
	},
	waitSeconds: 120

});



define(['app', 'widgets/smarthome/smarthome'], function(app){
	angular.element(document.body, app);
});
