define([
	'bublikApp',
	'angular',
	'components/servicies/messager/messager',
	'css!components/utils/tags/tags.css'
], function(app){
	"use strict";

	var directive = function($timeout, messager, userBackend){
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
				scope.selectedSuggestionIndex = -1;
				scope.activateAddedMode = function(){
					scope.addedMode = true;
					$timeout(function(){
						elm.find('input.add-tag-input').focus();
					}, 50);
				};
				scope.deactivateAddedMode = function(){
					scope.addedMode = false;
				};
				scope.addTag = function(tagName){
					if (scope.selectedSuggestionIndex===-1){
						if (scope.glxModel.indexOf(tagName)!==-1){
							messager.showErrorAlert("widget.tags.alert.alreadyExists.error");
							return;
						}
						if (!tagName||tagName==="") return;
						scope.addTagFunction(tagName);
					} else {
						scope.addTagFunction(scope.tagSuggestions[scope.selectedSuggestionIndex].name);
					}
					scope.tagNew = "";
					scope.isSuggestionsOpen = false;
					$timeout(function(){
						elm.find('input.add-tag-input').focus();
					}, 50);
				};
				scope.removeTag = function(tag){
					scope.removeTagFunction(tag);
				};
				scope.getSuggestions = function(){
					if (scope.tagNew.length<3) return;
					userBackend.getTagsSuggestions(scope.tagNew,scope.glxModel, function(data){
						if (data.tags.length>0){
							scope.tagSuggestions = data.tags;
							scope.isSuggestionsOpen = true;
						}
					})
				};
				scope.moveSelectionDown = function(){
					if (scope.isSuggestionsOpen && scope.selectedSuggestionIndex<scope.tagSuggestions.length-1){
						scope.selectedSuggestionIndex++;
					}
				};
				scope.moveSelectionUp = function(){
					if (scope.isSuggestionsOpen && scope.selectedSuggestionIndex>-1){
						scope.selectedSuggestionIndex--;
					}
				}
			}
		}
	};
	directive.$inject = ["$timeout", "glxMessager", "userBackend"];
	app.directive('glxTags', directive)
});

