angular.module('glxPages').directive('glxMenuSide', function (glxCurrentUserEntity, glxConfig, glxLocationHelper) {
    return {
        restrict: 'E',
        scope: {

        },
        templateUrl: 'pages/menuSide/menuSide.html',
        link: function (scope, element, attrs, fn) {
            scope.currentUser = glxCurrentUserEntity.currentUser;
            glxCurrentUserEntity.getCurrentUser();

            scope.goTo = function(menuItem){
                glxLocationHelper.redirectTo(menuItem);
            };

            scope.checkActive = function(link){
                return glxLocationHelper.isWeLocatedHere(link);
            };

            scope.getMenuItem = function(name){
                return glxConfig.menuItems[name] && glxConfig.menuItems[name](scope.currentUser.info.id);
            };

        }
    };
});
