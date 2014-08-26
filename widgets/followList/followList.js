angular.module('glxWidgets').directive('glxFollowList', function () {
    return {
        restrict: 'E',
        scope: {
            glxTitle: '@glxTitle'
        },
        transclude: true,
        templateUrl: 'widgets/followList/followList.html',
        link: function (scope, element, attrs, fn) {
            scope.childCount = 1;
        }
    };
});
