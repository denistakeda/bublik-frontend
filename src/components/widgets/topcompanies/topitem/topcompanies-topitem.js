define([
	'bublikApp',
	'angular',
	'components/services/storage',
	'angular-infinite-scroll',
	'css!components/widgets/topcompanies/topitem/topcompanies-topitem.css'
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
