angular.module('glxUtils').directive('glxAwaiting', function (glxApplicationReady) {
    return {
        restrict: "A",
        template: '<div us-spinner ng-show="isLoading()"></div><div class="ng-transclude" ng-hide="isLoading()"></div>',
        transclude: true,
        templateUrl: 'utils/directive/awaiting/awaiting.html',
        scope: {
            glxAwaiting: "@glxAwaiting"
        },
        link: function (scope) {
            if (scope.glxAwaiting === 'application') {
                scope.isReady = function () {
                    return glxApplicationReady.isResourceReady('localization') &&
                        glxApplicationReady.isResourceReady('mainContent') &&
                        glxApplicationReady.isResourceReady('currentUser');
                };
            } else {
                scope.isReady = function () {
                    return glxApplicationReady.isResourceReady(scope.glxAwaiting);
                };
            }

        }
    };
});