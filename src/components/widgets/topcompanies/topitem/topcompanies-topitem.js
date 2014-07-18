define([
	'bublikApp',
	'angular',
	'components/servicies/storage',
	'components/servicies/backend',
	'angular-infinite-scroll',
	'css!components/widgets/topitem/topitem.css'
], function(app){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/topcompanies/topitem/topcompanies-topitem.html',
			scope: {
				topItem: "="
			},
			link: function(scope, elm, attrs){
			}
		}
	};
	app.directive('glxTopItem', directive)
});
