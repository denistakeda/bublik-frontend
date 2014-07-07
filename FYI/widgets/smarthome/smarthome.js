define([
	'app',
	'services/backend',
	'services/storage',
	'widgets/rooms/rooms',
	'css!widgets/smarthome/smarthome.css'
], function (app) {
	"use strict";
	var directive = function () {
		return {
			restrict: "C",
			templateUrl: require.toUrl('widgets/smarthome/smarthome.html'),
			link: function (scope, elm, attrs) {

			}
		}
	}

	app.directive('shSmarthome', directive);
	console.log('smarthome');
});
