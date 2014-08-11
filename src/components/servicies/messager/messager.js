define([
	"bublikApp",
	"angular",
	'components/filters/translate',
	"components/servicies/config"
], function(app){
	"use strict";
	/**
	 * Added classes alghoritm:
	 * 1) Add alert object and class glx-added-alert
	 * 2) Replace class glx-added-alert by the glx-show-alert
	 * 3) Wait first timeout
	 * 4) Replace class glx-show-alert by the glx-hide-alert
	 * 5) Wait second timeout
	 * 6) Delete alert
	 */
	var glxMessager = function($timeout, config, $filter){
		var _private = {
			showAlert: function(alert, bootstrapClass){
				_public.alerts.push(alert);
				alert.displayClass = bootstrapClass+" glx-added-alert";
				$timeout(function(){
					alert.displayClass = bootstrapClass+" glx-show-alert";
				}, 50);
				$timeout(function(){
					alert.displayClass = bootstrapClass+" glx-hide-alert";
					$timeout(function(){
						_public.alerts.splice(_public.alerts.indexOf(alert), 1);
					}, 400)
				}, config.showAlertTimeout)
			}
		};
		var _public = {
			alerts: [],
			showSuccessAlert: function(header, body){
				_private.showAlert({header: $filter('localize')(header), body: $filter('localize')(body)}, "alert alert-success");
			},
			showErrorAlert: function(header, body){
				_private.showAlert({header: $filter('localize')(header), body: $filter('localize')(body)}, "alert alert-danger");
			}
		};

		return angular.extend({}, _public);
	};

	glxMessager.$inject = ["$timeout", "glxConfig", "$filter"];
	app.factory("glxMessager", glxMessager);

});
