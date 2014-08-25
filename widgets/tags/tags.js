angular.module('glxWidgets').directive('glxTags', function ($timeout, glxSuggestionsEntity) {
    return {
        restrict: 'E',
        scope: {
            glxModel: "=",
            glxAllowControl: "=",
            glxAddTagFunction: "=",
            glxRemoveTagFunction: "=",
            glxEmptyListCaption: "@",
            glxHeadCaption: "@",
            glxAddTagCaption: "@"
        },
        templateUrl: 'widgets/tags/tags.html',
        link: function (scope, element, attrs, fn) {
            scope.addedMode = false;
            scope.selectedSuggestionIndex = -1;
            scope.activateAddedMode = function () {
                scope.addedMode = true;
                $timeout(function () {
                    element.find('input.add-tag-input').focus();
                }, 50);
            };
            scope.deactivateAddedMode = function () {
                scope.addedMode = false;
            };
            scope.addTag = function (tagName) {
                if (scope.selectedSuggestionIndex === -1) {
                    if (scope.glxModel.indexOf(tagName) !== -1) {
                        //messager.showErrorAlert("widget.tags.alert.alreadyExists.error");
                        return;
                    }
                    if (!tagName || tagName === "") return;
                    scope.glxAddTagFunction(tagName);
                } else {
                    scope.glxAddTagFunction(scope.tagSuggestions[scope.selectedSuggestionIndex].name);
                }
                scope.tagNew = "";
                scope.isSuggestionsOpen = false;
                $timeout(function () {
                    element.find('input.add-tag-input').focus();
                }, 50);
            };
            scope.removeTag = function (tag) {
                scope.glxRemoveTagFunction(tag);
            };
            scope.getSuggestions = function () {
                if (scope.tagNew.length < 3) return;
                glxSuggestionsEntity.getTagSuggestions({keyword: scope.tagNew}, {exclude: scope.glxModel}, function (data) {
                    if (data.tags.length > 0) {
                        scope.tagSuggestions = data.tags;
                        scope.isSuggestionsOpen = true;
                    }
                })
            };
            scope.moveSelectionDown = function () {
                if (scope.isSuggestionsOpen && scope.selectedSuggestionIndex < scope.tagSuggestions.length - 1) {
                    scope.selectedSuggestionIndex++;
                }
            };
            scope.moveSelectionUp = function () {
                if (scope.isSuggestionsOpen && scope.selectedSuggestionIndex > -1) {
                    scope.selectedSuggestionIndex--;
                }
            }

        }
    };
});
