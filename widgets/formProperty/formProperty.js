angular.module('glxWidgets').directive('glxFormProperty', function () {
    return {
        restrict: 'E',
        replace: true,
        require: 'ngModel',
        scope: {
            glxId: '@',
            glxType: '@',
            glxLabel: '@',
            glxPlaceholder: '@',
            glxModel: '=',
            glxDisabled: '@',
            glxValidators: '='
        },
        templateUrl: 'widgets/formProperty/formProperty.html',
        link: function (scope, elm, attrs, model) {
            scope.model = model;

            scope.click = function(){
                console.error(scope.model);
            }
        }
    };
});
