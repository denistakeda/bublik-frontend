define([
	'bublikApp',
	'angular',
	'glx-utils!imagedrop',
	'components/servicies/messager',
	'css!components/widgets/userinfo/avatar/userinfo-avatar.css'
], function(app){

	var factory = function(backend){
		return function($scope, $modalInstance, messager){
			var avatar = {};
			$scope.ok = function(){
				backend.updateUserAvatar(avatar, function(){
					messager.showSuccessAlert("Ахренеть!", "Тут даже аватарку можно прокропить!!!");
				}, function(){
					messager.showErrorAlert("Блять!", "Нихрена не работает! Уходим отсюда!");
				});
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

	factory.$inject = ["backend", "glxMessager"];
	app.factory('userInfoAvatarCtrl', factory);

});