define([
	'bublikApp',
	'angular',
	'glx-utils!imagedrop',
	'css!components/widgets/userinfo/avatar/userinfo-avatar.css'
], function(app){

	var factory = function(){
		return function($scope, $modalInstance){
			$scope.ok = function(){
				$modalInstance.close();
			};

			$scope.onLoadImage = function(imgData){
			}

			$scope.onCropImage = function(x, y, w){
			}
		}
	};

	app.factory('userInfoAvatarCtrl', factory);

});