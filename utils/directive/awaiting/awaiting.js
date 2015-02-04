angular.module('glxUtils').directive('glxAwaiting', function (glxApplicationReady, $timeout) {
    return {
        restrict: 'A',
        transclude: true,
        templateUrl: 'utils/directive/awaiting/awaiting.html',
        scope: {
            glxAwaiting: '@glxAwaiting'
        },
        link: function (scope, element, attrs) {
            var hideClass = attrs.glxHideClass || 'glx-full-transparent';
            var showClass = attrs.glxShowClass || 'glx-full-untransparent';
            scope.glxSpinnerType = attrs.glxSpinnerType;

            scope.isReady = function () {
                var ready = scope.glxAwaiting === 'application' &&
                    glxApplicationReady.isResourceReady('localization') &&
                    glxApplicationReady.isResourceReady('currentUser')||

                    glxApplicationReady.isResourceReady(scope.glxAwaiting);
                if (ready) {
                    scope.contentClass = showClass;
                } else {
                    scope.contentClass = hideClass;
                }

                return ready;
            };
        }
    };
});