define([
	'bublikApp',
	'angular',
	'components/servicies/paths'
], function(app, angular){
	"use strict";

	app.config(['$routeProvider', 'glxPaths',
		function($routeProvider, paths){
			angular.forEach(paths.allRouting, function(routing){
				$routeProvider.
					when(routing.path, {
						template: routing.template,
						controller: routing.controller
					}
				);
			});

			$routeProvider.otherwise(paths.defaultRouting.path, {
				template: paths.defaultRouting.template,
				controller: paths.defaultRouting.controller
			});
		}]);
});
