define([
	"bublikApp",
	"angular",
    'components/servicies/resources'

], function (app, angular) {
	"use strict";

	var service = function (resources) {
		return resources.localization.get();
	}
	service.$inject = ['resources' ];
	app.factory("dictionary", service);
})
