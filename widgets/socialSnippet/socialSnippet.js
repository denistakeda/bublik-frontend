angular.module('glxWidgets').directive('glxSocialSnippet', function(glxConfig) {
    return {
        restrict: 'E',
        scope: {
            glxSnippetData: '='
        },
        templateUrl: 'widgets/socialSnippet/socialSnippet.html',
        link: function(scope, element, attrs, fn) {
            scope.getDefaultAvatar = function () {
                return scope.glxSnippetData.preview_url || glxConfig.defaultAvatar;
            };
        }
    };
});
