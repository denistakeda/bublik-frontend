angular.module('glxWidgets').directive('glxFollowButton', function (glxUserEntity, glxMessager, glxCurrentUserEntity) {
    return {
        restrict: 'E',
        scope: {
            glxSocialActions: '=glxSocialActions',
            glxOnFollow: '&glxOnFollow',
            glxOnUnfollow: '&glxOnUnfollow'
        },
        templateUrl: 'widgets/followButton/followButton.html'
    };
});
