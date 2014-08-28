angular.module('glxPages').directive('glxUserFollowed', function (glxSocialEntity) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pages/userFollowed/userFollowed.html',
        link: function (scope, elm, attrs, fn) {
            var limit = 10;

            scope.offset = 0;

            scope.hasMore = true;

            scope.socialInfo = glxSocialEntity.socialInfo;

            scope.add = function(){
                scope.loading = true;

                glxSocialEntity.getFollowed({limit: limit, offset: scope.socialInfo.followed.length}, function(data){
                    scope.loading = false;
                    if (data.length < limit) scope.hasMore = false;
                });
            }
        }
    };
});
