define([
	'app',
	'css!widgets/rooms/rooms.css'
], function (app) {
	"use strict";
	var directive = function (storage, backend) {
		return {
			restrict: "C",
			templateUrl: require.toUrl('widgets/rooms/rooms.html'),
			link: function (scope, elm, attrs) {
				backend.getRooms();
				scope.rooms = storage.rooms;
			}
		}
	}
	directive.$inject = ["storage", "backend"];
	app.directive('shRooms', directive)
});
