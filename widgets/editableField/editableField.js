angular.module('glxWidgets').directive('glxEditableField', function ($timeout) {
    return {
        restrict: 'E',
        scope: {
            glxModel: "=",
            glxOnChange: "&",
            glxEditable: "="
        },
        templateUrl: 'widgets/editableField/editableField.html',
        link: function (scope, element, attrs, fn) {
            var initVal;

            scope.edit = function(){
                if (!scope.glxEditable) return;
                initVal = scope.glxModel;
                scope.inputWidth = element.find(".edit-me").width() + 12 + 'px';
                scope.editableMode = true;
                //TODO: Not a best way
                $timeout(function(){
                    element.find(".edit-field").select();
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
    };
});
