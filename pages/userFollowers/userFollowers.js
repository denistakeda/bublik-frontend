angular.module('glxPages').directive('glxUserFollowers', function(glxSocialEntity, glxConfig) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pages/userFollowers/userFollowers.html',
        link: function(scope, element, attrs, fn) {
            var limit = glxConfig.socialObjectLimit;

            scope.offset = 0;

            scope.hasMore = true;

            scope.socialInfo = glxSocialEntity.socialInfo;

            scope.add = function(){
                scope.loading = true;

                glxSocialEntity.getFollowers({limit: limit, offset: scope.socialInfo.followers.length}, function(data){
                    scope.loading = false;
                    if (data.length < limit) scope.hasMore = false;
                });
            }
        }
    };
});
