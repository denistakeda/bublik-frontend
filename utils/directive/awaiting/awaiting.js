angular.module('glxUtils').directive('glxAwaiting', function (glxApplicationReady) {
    return {
        restrict: "A",
        transclude: true,
        templateUrl: 'utils/directive/awaiting/awaiting.html',
        scope: {
            glxAwaiting: "@glxAwaiting",
            glxSpinnerType: "@glxSpinnerType"
        },
        link: function (scope) {
                scope.isReady = function(){
                    if (scope.glxAwaiting === 'application'){
                        return glxApplicationReady.isResourceReady('localization') &&
                            glxApplicationReady.isResourceReady('currentUser');
                    } else {
                        return glxApplicationReady.isResourceReady(scope.glxAwaiting);
                    }
                };

        }
    };
});