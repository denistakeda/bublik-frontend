angular.module('glxPages').directive('glxMenuSide', function (glxCurrentUserEntity, glxConfig, glxLocationHelper) {
    return {
        restrict: 'E',
        scope: {

        },
        templateUrl: 'pages/menuSide/menuSide.html',
        link: function (scope, element, attrs, fn) {
            scope.storage = glxCurrentUserEntity.storage;
            glxCurrentUserEntity.getCurrentUser();

            scope.goTo = function(menuItem){
                glxLocationHelper.redirectTo(menuItem);
            };

            scope.checkActive = function(link){
                return glxLocationHelper.isWeLocatedHere(link);
            };

            scope.getMenuItem = function(name){
                return glxConfig.menuItems[name] && glxConfig.menuItems[name](scope.storage.currentUser.info.id);
            };

        }
    };
});
