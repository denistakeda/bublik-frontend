define([
	'bublikApp',
	'angular',
	'components/entities/userEntity',
	'glx-utils!imagedrop',
	'css!components/widgets/userinfo/avatar/userinfo-avatar.css'
], function(app){

	var controller = function($scope, $modalInstance, user, messager){
		var avatar = {};
		$scope.ok = function(){
			if (avatar.image_data) {
				user.changeAvatar({}, avatar, function(){
					messager.showSuccessAlert("widget.userAvatar.alert.successAvatarChanged");
				},
				function(){
					messager.showErrorAlert("widget.userAvatar.alert.errorAvatarChanged");
				});

				/*userBackend.updateUserAvatar(avatar, function(){
					messager.showSuccessAlert("widget.userAvatar.alert.successAvatarChanged");
				}, function(){
					messager.showErrorAlert("widget.userAvatar.alert.errorAvatarChanged");
				});*/
				avatar = {};
			}
			$modalInstance.close();
		};

		$scope.cancel = function(){
			$modalInstance.close();
		};

		$scope.onLoadImage = function(imgData, contentType){
			avatar.image_data = imgData;
			avatar.content_type = contentType;
		};

		$scope.onCropImage = function(x, y, l){
			avatar.crop_x = Math.round(x);
			avatar.crop_y = Math.round(y);
			avatar.crop_l = Math.round(l);
		}

	};

	controller.$inject = ["$scope", "$modalInstance", "glxUserEntity", "glxMessager"];
	app.controller('userInfoAvatarCtrl', controller);

});