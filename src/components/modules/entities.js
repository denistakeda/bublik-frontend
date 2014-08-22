define([
	// Standard Libs
	'angular',
	'angular-resource',
	'angular-route'
], function(angular){
	"use strict";

	var bublikEntities = angular.module('bublikEntities', ['ngResource', 'ngRoute']);

	return bublikEntities;
});
