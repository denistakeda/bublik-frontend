define([
	'bublikApp',
	'angular',
	'glx-utils!imagedrop',
	'css!components/widgets/userinfo/avatar/userinfo-avatar.css'
], function(app){

	var factory = function(backend){
		return function($scope, $modalInstance){
			var avatar = {};
			$scope.ok = function(){
				backend.updateUserAvatar(avatar);
				avatar = {};
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

	factory.$inject = ["backend"];
	app.factory('userInfoAvatarCtrl', factory);

});