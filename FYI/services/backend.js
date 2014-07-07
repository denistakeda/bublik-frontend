/**
 * @global define
 */
define([
	"app"
], function (app) {
	"use strict";


	var service = function (storage) {

		var
			/**
			 * Put new conditions
			 */
				_setters = {

			},

			/**
			 * GET data methods, should be private as well
			 */
				_getters = {

					getRooms : function(){
						storage.rooms = [{
							id: "badroom1",
							title:"Badroom",
							preview:"img/badroom.png",
							devices:{
								lighting: [
									{id:"lamp1", type: "discret", value: "ON"},
									{id:"lamp1", type: "discret", value: "OFF"},
								]
							}
						},
							{
								id: "diningroom1",
								title:"Dining room",
								preview:"img/diningroom.png",
								devices:{
									lighting: [
										{id:"lamp3", type: "discret", value: "ON"},
										{id:"lamp4", type: "discret", value: "ON"},
									]
								}
							}]
					}

			}




		return angular.extend({}, _setters, _getters);
	}
	service.$inject = ["storage"];
	app.factory("backend", service);
	return service;
})
