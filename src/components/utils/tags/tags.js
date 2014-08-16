define([
	'bublikApp',
	'angular',
	'css!components/utils/tags/tags.css'
], function(app){
	"use strict";

	var directive = function($timeout){
		return {
			restrict: "C",
			templateUrl: '../components/utils/tags/tags.html',
			scope: {
				glxModel: "=",
				allowControl: "=",
				addTagFunction: "=",
				removeTagFunction: "=",
				emptyListCaption: "@",
				headCaption: "@",
				addTagCaption: "@"
			},
			link: function(scope, elm, attrs){
				scope.addedMode = false;
				scope.activateAddedMode = function(){
					scope.addedMode = true;
					$timeout(function(){
						elm.find('input.add-tag-input').focus();
					}, 50);
				};
				scope.deactivateAddedMode = function(){
					scope.addedMode = false;
				};
				scope.addTag = function(){
					scope.addTagFunction(scope.tagNew);
					scope.tagNew = "";
					$timeout(function(){
						elm.find('input.add-tag-input').focus();
					}, 50);
				};
				scope.removeTag = function(tag){
					scope.removeTagFunction(tag);
				}
			}
		}
	};
	directive.$inject = ["$timeout"];
	app.directive('glxTags', directive)
});

