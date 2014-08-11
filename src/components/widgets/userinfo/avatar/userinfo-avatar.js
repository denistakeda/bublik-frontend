define([
	'bublikApp',
	'angular',
	'glx-utils!imagedrop',
	'css!components/widgets/userinfo/avatar/userinfo-avatar.css'
], function(app){

	var controller = function($scope, $modalInstance, userBackend, messager){
		var avatar = {};
		$scope.ok = function(){
			if (avatar.data) {
				userBackend.updateUserAvatar(avatar, function(){
					messager.showSuccessAlert("widget.userAvatar.alert.successAvatarChanged");
				}, function(){
					messager.showErrorAlert("widget.userAvatar.alert.errorAvatarChanged");
				});
				avatar = {};
			}
			$modalInstance.close();
		};

		$scope.cancel = function(){
			$modalInstance.close();
		};

		$scope.onLoadImage = function(imgData, contentType){
			avatar.data = imgData;
			avatar.contentType = contentType;
		};

		$scope.onCropImage = function(x, y, l){
			avatar.x = Math.round(x);
			avatar.y = Math.round(y);
			avatar.l = Math.round(l);
		}

	};

	controller.$inject = ["$scope", "$modalInstance", "userBackend", "glxMessager"];
	app.controller('userInfoAvatarCtrl', controller);

});