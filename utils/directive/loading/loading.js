angular.module('glxUtils').directive('glxLoading', function (glxApplicationReady) {
    return {
        restrict: "A",
        template: '<div us-spinner ng-show="isLoading()"></div><div class="ng-transclude" ng-hide="isLoading()"></div>',
        transclude: true,
        scope: {
            glxLoading: "="
        },
        link: function(scope){
            scope.isLoading = function(){
                return !glxApplicationReady.isApplicationReady() || scope.glxLoading;
            };
        }
    };
});