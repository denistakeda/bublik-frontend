define([
	'bublikApp',
	'css!components/widgets/rigthmenu/rigthmenu.css'
], function(app){
	"use strict";

	var directive = function(){
		return {
			restrict: "C",
			templateUrl: '../components/widgets/rigthmenu/rigthmenu.html',
			link: function(scope, elm, attrs){
			}
		}
	}
	directive.$inject = [];
	app.directive('glxRigthMenu', directive)
});
