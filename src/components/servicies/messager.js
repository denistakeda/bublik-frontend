define([
	"bublikApp",
	"angular",
	"components/servicies/config"
], function(app){
	"use strict";

	var glxMessager = function($timeout, config){
		var _private = {
			showAlert: function(alert){
				_public.alerts.push(alert);
				$timeout(function(){
					alert.hideAlert = true;
					$timeout(function(){
						_public.alerts.splice(_public.alerts.indexOf(alert), 1);
					}, config.deleteAlertTimeout)
				}, config.showAlertTimeout)
			}
		};
		var _public = {
			alerts: [],
			showSuccessAlert: function(header, body){
				_private.showAlert({header: header, body: body, successAlert: true});
			},
			showErrorAlert: function(header, body){
				_private.showAlert({header: header, body: body, errorAlert: true});
			}
		};

		return angular.extend({}, _public);
	};

	glxMessager.$inject = ["$timeout", "glxConfig"];
	app.factory("glxMessager", glxMessager);

});
