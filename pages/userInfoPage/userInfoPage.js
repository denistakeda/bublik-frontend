angular.module('glxPages').directive('glxUserInfoPage', function ($modal, glxConfig, glxUserEntity, glxMessager) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'pages/userInfoPage/userInfoPage.html',
        link: function (scope, element, attrs, fn) {
            scope.changeAvatar = function () {
                var avatarModalInstanse = $modal.open({
                    templateUrl: "widgets/userAvatar/userAvatar.html",
                    controller: 'glxUserAvatar'
                });
            };
            scope.getDefaultAvatar = function () {
                return glxConfig.defaultAvatar;
            };

            scope.updateUserName = function () {
                glxUserEntity.changeUserName({first_name: scope.userInfo.first_name, last_name:  scope.userInfo.last_name},
                function () {
                    glxMessager.showSuccessAlert("widget.userInfo.alert.firstNameChange.success");
                }, function () {
                    glxMessager.showErrorAlert("widget.userInfo.alert.firstNameChange.error");
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

            scope.userInfo = glxUserEntity.userInfo;
            glxUserEntity.getUserInfo();

        }
    };
});
