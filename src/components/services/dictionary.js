define([
	"bublikApp",
	"angular",
	'components/services/backends/common/commonResource'

], function(app, angular){
	"use strict";

	var service = function(commonResource, $rootScope){
		return commonResource.localization.get({}, function(){
			$rootScope.localizationLoading = false;
		});
	}
	service.$inject = ['commonResource', '$rootScope' ];
	app.factory("dictionary", service);
})
