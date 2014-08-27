angular.module('glxWidgets').directive('glxFollowButton', function (glxUserEntity, glxMessager, glxCurrentUserEntity) {
    return {
        restrict: 'E',
        scope: {
            glxSocialActions: "=glxSocialActions"
        },
        templateUrl: 'widgets/followButton/followButton.html',
        link: function (scope, element, attrs, fn) {

            scope.follow = function () {
                glxUserEntity.followUser({userId: glxCurrentUserEntity.currentUser.info.id,
                    followedId: glxUserEntity.userInfo.id}).$promise
                    .catch(function () {
                        glxMessager.showErrorAlert('widget.userInfo.backenderror');
                    });
            };

            scope.unfollow = function () {
                glxUserEntity.unfollowUser({userId: glxCurrentUserEntity.currentUser.info.id,
                    unfollowedId: glxUserEntity.userInfo.id}).$promise
                    .catch(function () {
                        glxMessager.showErrorAlert('widget.userInfo.backenderror');
                    });
            };
        }
    };
});
