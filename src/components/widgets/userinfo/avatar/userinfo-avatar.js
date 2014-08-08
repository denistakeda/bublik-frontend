define([
	'bublikApp',
	'angular',
	'glx-utils!imagedrop',
	'components/servicies/messager/messager',
	'css!components/widgets/userinfo/avatar/userinfo-avatar.css'
], function(app){

	var factory = function(backend, messager){
		return function($scope, $modalInstance){
			var avatar = {};
			$scope.ok = function(){
				if (avatar.data) {
					backend.updateUserAvatar(avatar, function(){
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

			$scope.onLoadImage = function(imgData){
				avatar.data = imgData;
			};

			$scope.onCropImage = function(x, y, l){
				avatar.x = x;
				avatar.y = y;
				avatar.l = l;
			}
		}
	};

	factory.$inject = ["backend", "glxMessager"];
	app.factory('userInfoAvatarCtrl', factory);

});