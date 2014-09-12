angular.module('glxPages').directive('glxUserInfoPage', function ($modal, glxConfig, glxUserEntity, glxMessager, glxLocationHelper, glxCurrentUserEntity) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'pages/userInfoPage/userInfoPage.html',
        link: function (scope, element, attrs, fn) {
            var currentUserInfo = glxCurrentUserEntity.currentUser.info;

            scope.changeAvatar = function () {
                var avatarModalInstanse = $modal.open({
                    templateUrl: "widgets/userAvatar/userAvatar.html",
                    controller: 'glxUserAvatar'
                });
            };

            scope.getAvatar = function () {
                return scope.userInfo.avatar && scope.userInfo.avatar.preview_url || glxConfig.defaultAvatar;
            };

            scope.updateUserName = function () {
                glxUserEntity.changeUserName({first_name: scope.userInfo.first_name, last_name:  scope.userInfo.last_name},
                function () {
                    glxMessager.showSuccessAlert("widget.userInfo.alert.firstNameChange.success");
                }, function () {
                    glxMessager.showErrorAlert("widget.userInfo.alert.firstNameChange.error");
                });
            };

            scope.follow = function(){
                glxUserEntity.followUser({
                    userId: currentUserInfo.id,
                    followedId: glxUserEntity.storage.userInfo.id
                }, {},
                function(){
                    glxUserEntity.getUserInfo({userId: scope.userInfo.id});
                },
                function(){
                    glxMessager.showErrorAlert('widget.userInfo.backenderror');
                });
            };

            scope.unfollow = function(){
                glxUserEntity.unfollowUser({
                        userId: currentUserInfo.id,
                        unfollowedId: glxUserEntity.storage.userInfo.id
                    }, {},
                    function(){
                        glxUserEntity.getUserInfo({userId: scope.userInfo.id});
                    },
                    function(){
                        glxMessager.showErrorAlert('widget.userInfo.backenderror');
                    });
            };

            scope.addTag = function (tag) {
                glxUserEntity.addInterests({}, {interests: [tag]}, undefined, function () {
                    glxMessager.showErrorAlert("widget.userInfo.alert.addInterest.error");
                });
            };
            scope.removeTag = function (tag) {
                glxUserEntity.removeInterests({}, {interests: [tag]}, undefined, function () {
                    glxMessager.showErrorAlert("widget.userInfo.alert.removeInterest.error");
                });
            };

            scope.toFollowers = function(){
                glxLocationHelper.redirectTo("/user/" + glxUserEntity.storage.userInfo.id + "/followers");
            };

            scope.toFollowed = function(){
                glxLocationHelper.redirectTo("/user/" + glxUserEntity.storage.userInfo.id + "/followed");
            };

            scope.userInfo = glxUserEntity.storage.userInfo;
        }
    };
});
