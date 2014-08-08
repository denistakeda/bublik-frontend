// we get all the test files automatically
var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/.*Spec\.js$/.test(file) && !~file.indexOf('libs')) {
			tests.push(file);
		}
	}
}

require.config({
	paths: {
		angular: 'libs/angular/1.2.13/angular.min',
		angularMocks: 'libs/angular/1.2.13/angular-mocks',
		"ui-utils": "libs/ui-utils-0.1.1/ui-utils.min",
		"ui-date": "libs/ui-date/src/date",
		jquery: 'libs/jquery/jquery.min',
		jQueryUI: 'libs/jquery/jquery-ui.min',
		'bootstrap': 'libs/bootstrap/dist/js/bootstrap.min',

		'angular-sanitize': 'libs/angular/1.2.13/angular-sanitize.min',
		'angular-resource': 'libs/angular/1.2.13/angular-resource.min',
		'angular-animate': 'libs/angular/1.2.13/angular-animate.min',
		'angular-touch': 'libs/angular/1.2.13/angular-touch.min',

		'components/templates': "../target/runtime/components/templates"
	},
	baseUrl: '/base/src',
	shim: {
		'angular-sanitize': { deps: ['angular']},
		'angular-resource': { deps: ['angular']},
		'angular-animate': { deps: ['angular']},
		'angular-touch': { deps: ['angular']},

		"ui-utils": {
			deps: ["angular"]
		},
		"ui-date": {
			deps: ["angular", "jQueryUI"]
		},
		'jquery': { exports: '$'},
		'jQueryUI': { deps: ['jquery'], exports: '$.ui'},
		'angular': {deps: ['jquery', 'jQueryUI'], exports: 'angular'},
		'bootstrap': {deps: ['jquery',
			"css!//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
//			'css!libs/bootstrap/dist/css/bootstrap.min.css'
		]},
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},
	deps: tests,
	callback: window.__karma__.start,

	isBuild: true
});

define('ibxApp', ["components/apps/app"], function(){
	return require("components/apps/app");
});
