angular.module('glxPages').directive('glxTopMenu', function (glxCurrentUserEntity, glxConfig) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'pages/topMenu/topMenu.html',
        link: function (scope, element, attrs, fn) {

            scope.currentUser = glxCurrentUserEntity.currentUser;
            glxCurrentUserEntity.getCurrentUser();

            scope.logout = function () {
                glxCurrentUserEntity.logout();
            };

            scope.getUserAvatar = function () {
                return scope.currentUser.info.avatar_preview_url || config.defaultAvatar;
            }

        }
    };
});
