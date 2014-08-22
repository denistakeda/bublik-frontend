define([
	"bublikEntities",
	"angular"
], function(app, angular){
	"use strict";

	var transformResponseCollection = function(){
		return {
			fromJsonConverter: function(data){
				return angular.fromJson(data);
			},
			extractData: function(data){
				return data.data;
			}
		}
	};

	app.factory("glxTransformResponseCollection", transformResponseCollection);
	return transformResponseCollection;
});
