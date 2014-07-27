define([
	"bublikApp",
	"angular",
	'components/servicies/resources'

], function(app, angular){
	"use strict";

	var service = function(resources, $rootScope){
		return resources.localization.get({}, function(){
			$rootScope.localizationLoading = false;
		});
	}
	service.$inject = ['resources', '$rootScope' ];
	app.factory("dictionary", service);
})
