define([
	'bublikApp',
	'angular',
	'css!components/utils/editablefield/editablefield.css'
], function(app){
	"use strict";

	var directive = function($timeout){
		return {
			restrict: "C",
			templateUrl: '../components/utils/editablefield/editablefield.html',
			required: "glxModel",
			scope:{
				glxModel: "=",
				glxOnChange: "&",
				glxEditable: "="
			},
			link: function(scope, elm, attrs){
				var initVal;

				scope.edit = function(){
					if (!scope.glxEditable) return;
					initVal = scope.glxModel;
					scope.inputWidth = elm.find(".edit-me").width()+12+'px';
					scope.editableMode = true;
					//TODO: Not a best way
					$timeout(function(){
						elm.find(".edit-field").select();
					}, 10);
				};

				scope.cancel = function(){
					scope.glxModel = initVal;
					scope.editableMode = false;
				};

				scope.apply = function(){
					initVal = scope.glxModel;
					scope.editableMode = false;
					scope.glxOnChange();
				}
			}
		}
	};
	directive.$inject = ["$timeout"];
	app.directive('glxEditableField', directive)
});

