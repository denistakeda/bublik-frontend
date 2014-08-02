define([
	'bublikApp',
	'angular',
	'glx-utils!editablefield',
	'css!components/widgets/userinfo/userinfo.css'
], function(app){

	var factory =function(){return function($scope, $modalInstance){
		$scope.ok = function(){
			$modalInstance.close();
		}
	}};

	app.factory('userInfoAvatarCtrl', factory);

});