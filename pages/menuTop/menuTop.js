angular.module('glxPages').directive('glxMenuTop', function (glxCurrentUserEntity, glxConfig, glxLocationHelper) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'pages/menuTop/menuTop.html',
        link: function (scope, element, attrs, fn) {

            scope.storage = glxCurrentUserEntity.storage;
            glxCurrentUserEntity.getCurrentUser();

            scope.createCompany = function(){
                glxLocationHelper.redirectTo("user/" + scope.storage.currentUser.info.id + "/companies/new/");
            };

            scope.logout = function () {
                glxCurrentUserEntity.logout();
            };

            scope.getUserAvatar = function () {
                return scope.storage.currentUser.info.avatar_preview_url || glxConfig.defaultAvatar;
            };

        }
    };
});
