angular.module('glxPages').directive('glxUserInfoPage', function ($modal, glxConfig, glxUserEntity) {
    return {
        restrict: 'E',
        scope: {

        },
        templateUrl: 'pages/userInfoPage/userInfoPage.html',
        link: function (scope, element, attrs, fn) {
            scope.changeAvatar = function () {
                var avatarModalInstanse = $modal.open({
                    templateUrl: "../../widgets/userAvatar/userAvatar.html",
                    controller: 'glxUserAvatar'
                });
            };
            scope.getDefaultAvatar = function () {
                return glxConfig.defaultAvatar;
            };

            /*scope.updateFirstName = function () {
                userBackend.updateUserFirstName(scope.userInfo.first_name, function () {
                    messager.showSuccessAlert("widget.userInfo.alert.firstNameChange.success");
                }, function () {
                    messager.showErrorAlert("widget.userInfo.alert.firstNameChange.error");
                });
            };*/

            /*scope.updateLastName = function () {
                userBackend.updateUserLastName(scope.userInfo.last_name, function () {
                    messager.showSuccessAlert("widget.userInfo.alert.secondNameChange.success");
                }, function () {
                    messager.showErrorAlert("widget.userInfo.alert.secondNameChange.error");
                });
            };*/

            scope.addTag = function (tag) {
                glxUserEntity.addInterests({}, {interests: [tag]}, undefined, function () {
                    //messager.showErrorAlert("widget.userInfo.alert.addInterest.error");
                })
            };
            scope.removeTag = function (tag) {
                glxUserEntity.removeInterests({}, {interests: [tag]}, undefined, function () {
                    //messager.showErrorAlert("widget.userInfo.alert.removeInterest.error");
                })
            };

            scope.userInfo = glxUserEntity.userInfo;
            glxUserEntity.getUserInfo();

        }
    };
});
