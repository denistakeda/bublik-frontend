angular.module('glxWidgets').directive('glxFollowList', function () {
    return {
        restrict: 'E',
        scope: {
            glxTitle: '@',
            glxRedirectOnClick: '='
        },
        transclude: true,
        templateUrl: 'widgets/followList/followList.html',
        controller: function($scope){
            $scope.childCount = 0;
            this.addItem = function(){
                $scope.childCount++;
            };
        }
    };
});
