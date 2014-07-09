define([
	"ibxApp",
	"angular",
	'components/services/config'
], function(app){
	"use strict";
	var service = function(){

		var _public = {
			/**
			 * @property results {Array} snippets related with current conditions
			 */
			results: [],
			/**
			 * @property selectedSnippet {Optional} - data for detailed view, Object or null
			 */
			selectedSnippet:null,

			/**
			 * @property categories {Array} - categories for Result
			 */
			categories:[],
			/**
			 * @property tags {Array} - tags for Result
			 */
			tags:[],
			/**
			 * @property columns {Array} - columns for table
			 */
			columns:[],
			/**
			 * @property askedColumns {Array} - columns uri's which requested from QS
			 */
			askedColumns:[],
			/**
			 * @property allcolumns {Array} - all available columns for table
			 */
			allcolumns:[],
			/**
			 * @property sorting {Array} - sorting for table
			 */
			sorting:[],
			/**
			 * @property rows {Array} - rows for table
			 */
			rows:[],
			/**
			 * @property filters - query conditions
			 */
			filters:[],

			/**
			 * @property facets {Array} List of available facets
			 */
			facets: [],

			/**
			 * @property currentApp - current application
			 */
			currentApp:"SEARCH",

			/**
			 * @property totalCount {Number} count of search results
			 */
			totalCount: null,
			/**
			 * @property loading {Boolean} Is the result fresh
			 */
			loading: false,
			loadingMore: false,
			/**
			 * @property fullResult {Boolean} Is this full result
			 */
			fullResult: true,

			recent:[],
			/**
			 * @property savedQueries {Array} - saved queries for search
			 */
			savedQueries:[],


			/**
			 * Time spend to search. Used in resultCount
			 */
			requestDuration: 0,

			/**
			 * Information about user and his preferences
			 */
			userinfo: {},

			collapsedFilters: 0
		};




		return _public;
	};

	app.factory("ibxStorage", service);

	return service;
});
