angular.module('glxWidgets').controller('glxUserAvatar', function ($scope, $modalInstance, glxUserEntity) {
    var avatar = {};
    $scope.ok = function () {
        if (avatar.image_data) {
            glxUserEntity.changeAvatar({}, avatar, function () {
                    //messager.showSuccessAlert("widget.userAvatar1.alert.successAvatarChanged");
                },
                function () {
                    //messager.showErrorAlert("widget.userAvatar1.alert.errorAvatarChanged");
                });
            avatar = {};
        }
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };

    $scope.onLoadImage = function (imgData, contentType) {
        avatar.image_data = imgData;
        avatar.content_type = contentType;
    };

    $scope.onCropImage = function (x, y, l) {
        avatar.crop_x = Math.round(x);
        avatar.crop_y = Math.round(y);
        avatar.crop_l = Math.round(l);
    }

});
