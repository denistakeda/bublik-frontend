/**
 * @global define sessionStorage
 */
define([
	"ibxApp",
	"jquery",
	"angular",
	"components/factories/QueryFilter",
	"components/factories/SessionState",
	"components/factories/ApplicationState",
	"components/services/Request",
	"components/services/storage",
	"components/services/config"
], function (app, $, angular) {
	"use strict";

	var properties = {
		load: {
			results: 0,
			table: 0,
			history: 0,
			categories: 0,
			tags: 0,
			resultCount: 0,
			facet: 0
		}
	};

	var service = function (Request, storage, $timeout, config, QueryFilter, SessionState, ApplicationState) {

		var serializeDataToSend = function(){
			var data = [];
			angular.forEach(storage.filters, function(filter) {
				if ((!filter.editMode || filter.saved) && filter.validate() === null) {
					// add only valid filters
					data.push(filter.serialize());
					// and mark it as saved
					filter.saved = true;    // todo check is the operation placed at the correct line of code
				}
			});

			return data;
		};




		var search = function (cb) {
			cb = cb || function () {
				return true
			};

			// save it for future
			var conditions = [];
			angular.forEach(storage.filters, function(filter){
				conditions.push( filter.serialize() );
			});
			sessionStorage.setItem("ibxSearchConditions", angular.toJson(conditions) );

			var response = { id: SessionState.new() };
			cb(response) && new SessionState(response.id);

			if (storage.savedQueries.firstSearchAfterSaved){
				storage.savedQueries.firstSearchAfterSaved = false;
			}else {
				storage.savedQueries.currentQuery = null;
			}
		}

		// get last application name before initialization
		var currentApplication = sessionStorage.getItem("ibxSearchApplication");
		$timeout(function () {    // undefined without timeout
			if (!SessionState.getCurrentState()) {
				// load conditions from sessionStorage
				var conditions = sessionStorage.getItem("ibxSearchConditions");
				if (conditions) {
					angular.forEach( angular.fromJson(conditions), function(f){
						var filter = QueryFilter.restore(f);
						_callbacks.putFilterQuery( filter );
					} );
				}
				// set the application
				new ApplicationState( currentApplication );
				// and search it!
				search();
			}
		}, 0);

		// extend on initialization to avoid call this method on apply filter.
		QueryFilter.searchFunction = search;
		QueryFilter.removeFunction = function (filter) {
			var position = storage.filters.indexOf(filter);
			if (~position) {
				storage.filters.splice(position, 1);
				if (filter.saved)   // do not execute search if filter was not applied
					search();
			}
		};

		/**
		 * Remap columns for usage in tables
		 * @param columns
		 */
		var remapColumns = function (columns) {
			var self = this;
			var getPredifinedWidth = function (ctype) {
				var tconfig = config.get("tables");
				var w;
				switch (ctype) {
					case "image":
						w = tconfig.imagewidth;
						break
					case "boolean":
						w = tconfig.booleanwidth;
						break;
					default:
						w = undefined;
				}
				return w;
			}
			var removeSpecial = function (str) {
				return str.replace(/[^a-zA-Z ]/g, "");
			}
			return $.map(columns, function (col, i) {
				if (!col.label)return null; //skip columns with empty labels

				return {
					uri: col.uri,
					type: config.getSimpleType(col.dataType.uri),
					sortable: config.isSortableType(col.dataType),
					filterable: config.isFilterableType(col.dataType),
					dataType: col.dataType,
					label: col.label,
					width: col.width || getPredifinedWidth(config.getSimpleType(col.dataType.uri))
				}
			});
		}

		var
			/**
			 * Put new conditions
			 */
			_setters = {
				/**
				 * Register components which should be updated with query changing
				 * @param component {String} one of the known componenets (results, categories, resultCount, table, history)
				 * @param off {Boolean=} Pass true if required to disable a component. Should be called from destructor.
				 */
				autoload: (function () {
					var timeout;
					return function (component, off) {
						var requiresLoading;
						switch (component) {
							case "results":
								properties.load.results += off ? -1 : 1;
								requiresLoading = off ? false : properties.load.results === 1;
								break;
							case "categories":
								properties.load.categories += off ? -1 : 1;
								requiresLoading = off ? false : properties.load.categories === 1;
								break;
							case "tags":
								properties.load.tags += off ? -1 : 1;
								requiresLoading = off ? false : properties.load.tags === 1;
								break;
							case "resultCount":
								properties.load.resultCount += off ? -1 : 1;
								requiresLoading = off ? false : properties.load.resultCount === 1;
								break;
							case "table":
								properties.load.table += off ? -1 : 1;
								requiresLoading = off ? false : properties.load.table === 1;
								//If we are in table - make callbacks for clearing columns before new searches
								var cb = function () {
									storage.columns.splice(0);
								}
								if (properties.load.table === 0) {
									QueryFilter.FulltextSearch.prototype.offChangeFilter(cb);
									QueryFilter.PredicateSearch.prototype.offChangeFilter(cb);
									QueryFilter.SimilarSearch.prototype.offChangeFilter(cb);
								} else if (properties.load.table === 1) {
									QueryFilter.FulltextSearch.prototype.onChangeFilter(cb);
									QueryFilter.PredicateSearch.prototype.onChangeFilter(cb);
									QueryFilter.SimilarSearch.prototype.onChangeFilter(cb);
								}
								break;
							case "history":
								properties.load.history += off ? -1 : 1;
								requiresLoading = off ? false : properties.load.history === 1;
								break;
							case "facet":
								properties.load.facet += off ? -1 : 1;
								requiresLoading = off ? false : properties.load.facet === 1;
								break;
						}
						if (requiresLoading) {
							$timeout.cancel(timeout);
							timeout = $timeout(function () {
								SessionState.refresh();
							}, 1);
						}
					}
				}()),
				setRevisionId: function (rid, silent) {
					new SessionState(rid, silent);
				},

				/**
				 * Add new search criteria to existing list.
				 * @param searchQuery {SearchQuery} New search criteria
				 * @param callback {Function} Function which will be called after the search execution
				 */
				setSearchQuery: function (searchQuery, callback) {
					// add new search criteria
					if (storage.filters.length === _callbacks.putFilterQuery(searchQuery)) {
						// execute search if new filter was added
						searchQuery.beforeChangeFilter();
						search(callback);
					}
				},
				searchOneCriteria: function (searchQuery, callback) {
					_setters.setEmptyCriteria();
					_setters.setSearchQuery(searchQuery);
					callback && callback({ id: SessionState.new() });
				},
				setEmptyCriteria: function (searchIt) {
					storage.filters.splice(0);
					if (searchIt) search();
				},

				/**
				 * Mark some snippet as active, load additional data;
				 * @param snippet {Object} Exist snippet data or {Null} if no one is active
				 */
				setActiveSnippet: function (snippet) {
					// put snippet in storage as is
					storage.selectedSnippet = snippet;
					if (snippet) {
						// get additional data if it required
						_getters.getSnippetData(snippet);
						_getters.getRichData(snippet);
					}
				},

				setSorting: function (uri, ascending) {
					if (uri) {
						storage.sorting =
							[
								{"uri": uri,
									"ascending": ascending}
							]

					} else {
						storage.sorting = [];
					}
				},

				saveQuery: function (name, rewrite, cb) {
					return new Request({
						type: "POST",
						dataType: 'json',
						url: "/qs/query/saved/?rewrite=:rewrite",
						bind : {
							rewrite: !!rewrite
						},
						data: {
							label: name,
							application: ApplicationState.getCurrentState(),
							query: {
								constraint: {
									value: serializeDataToSend(),
									negated: false,
									logic: "AND",
									type: "Constraints"
								},
								sortings: {
									value: storage.sorting
								},
								askedColumns: storage.columns
							}
						}
					}).done(function (data) {
							// add in saved list
							storage.savedQueries.unshift({
								id: data.id,
								label: name,
								time: new Date().getTime(),
								application: ApplicationState.getCurrentState()
							});
							if (cb) cb();
							_setters.setSavedQuery(storage.savedQueries[0]);
					})
				},

				renameQuery: function (newName, queryId, cb) {
					return new Request({
						type: "PUT",
						dataType: "text",
						url: "/qs/query/saved/:queryId",
						bind: {
							queryId: queryId
						},
						data: {
							label: newName
						}
					}).done(function(){
							if (cb) cb();
							storage.savedQueries.currentQuery.label = newName;
						});
				},

				setSavedQuery: function(query){
					storage.savedQueries.firstSearchAfterSaved = true;
					new SessionState(query.id, true); //second is 'silent' id
					if (!storage.savedQueries.currentQuery) storage.savedQueries.currentQuery = {};
					angular.copy(query, storage.savedQueries.currentQuery);
				},

				loadQuery: function(query, fromHistory){
					_setters.setSavedSearchName(query.label);
					_getters.getQueryById(query.id).done(function(data){
						if (!fromHistory) {
							storage.savedQueries.loading = query.id;
							_setters.setSavedQuery(query);
							_setters.setCurrentApp(data.application);
						}
						//fill data for rq askedColumns param
						angular.copy(data.query.askedColumns, storage.askedColumns);
						storage.columns.splice(0);
						//fill sorting data
						angular.copy(data.query.sortings.value, storage.sorting);
						//put filters from saved queries
						var filtersList = data.query.constraint.value;
						_setters.setEmptyCriteria();
						angular.forEach(filtersList, function(f){
							var filter = QueryFilter.restore(f);
							if (filter) _callbacks.putFilterQuery(filter);
						});
						//searching results
						search();
					})
				},

				/**
				 * Put saved search title to session storage
				 * @param name {String} saved search title
				 */
				setSavedSearchName: function(name){
					sessionStorage.setItem("ibxSavedSearchName", name);
				},

				/**
				 * Set current app
				 * @param app {String} Application name
				 */
				setCurrentApp: function (app) {
					new ApplicationState(app);
				},
				mergeTables: function () {
					return new Request();
				}
			},

			/**
			 * GET data methods, should be private as well
			 */
			_getters = {

				getStorage: function () {
					return storage;
				},

				getRevisionId: function () {
					return SessionState.getCurrentState();
				},

				/**
				 * Get metaData and WebQuery for current search
				 * @return {Request} XHR object
				 */
				getQueryConditions: function () {
					return new Request({
						url: '/api/results/:queryId?webquery',
						bind: {
							queryId: SessionState.getCurrentState()
						},
						dataType: 'json'
					}).done(function (data) {
							angular.forEach(storage.sorting, function(item, key){
								delete storage.sorting[key];
							});
							angular.forEach(data.webquery.sorting || [],function(sortitem){
								if(sortitem.property && sortitem.property.uri){
									storage.sorting[sortitem.property.uri]={ uri: sortitem.property.uri, ascending: sortitem.ascending };
								}
							});

							storage.savedName.name = data.webquery.meta_data.name
							// update queryString;
//						storage.filters.length = 0;     // reset
							var filterListIds = [];
							angular.forEach(data.webquery.constraints_container.logical_container.constraints, function (item, i) {
								var filter;
								switch (item.type) {
									case "SEARCH_FULLTEXT":
										if (item.search_fulltext.search_string !== "") {
											filter = new QueryFilter.FulltextSearch(item.search_fulltext.search_string);
										}
										break;
									case "SEARCH_PREDICATE":
										filter = new QueryFilter.PredicateSearch({
											snippet_name: item.search_predicate.snippet.label || "Something",
											snippet_uri: item.search_predicate.snippet.uri,
											predicate_name: item.search_predicate.predicate.label || "Somewhat",
											predicate_uri: item.search_predicate.predicate.uri
										});
										break;
									case "SEARCH_SIMILAR":
										filter = new QueryFilter.SimilarSearch({
											snippet_name: item.search_similar.snippet.label || "Something",
											snippet_uri: item.search_similar.snippet.uri,
											category_name: item.search_similar.category.label || "Somewhat",
											category_uri: item.search_similar.category.uri
										});
										break;
									case "PROPERTY_FILTER_RULE" :
										filter = new QueryFilter.PropertyFilter(item.property_filter_rule);
										break;
									case "CATEGORY_FILTER" :
										filter = new QueryFilter.CategoryFilter(item.category_filter.categories[0]);
										break;
									case "TAG_FILTER" :
										filter = new QueryFilter.TagFilter(item.tag_filter.tags[0]);
										break;
									case "OBJECT_LINK_RULE" :
										filter = new QueryFilter.ObjectLinkRule(item.object_link_rule.property);
										break;
									case "SEARCH_CONTEXT" :
										filter = new QueryFilter.ContextRule(item.search_context.snippet);
										break;
								}
								if (filter) {
									var index = _callbacks.putFilterQuery(filter);
									filterListIds.push( index );
									storage.filters[index].saved = true;
									storage.filters[index].order = i;   // sort filters after adding
								}
							});
							// remove filters, that has not been included in filterListIds
							angular.forEach(storage.filters, function(filter, i){
								if (!~filterListIds.indexOf(i)){    // remove
									$timeout(function(){
										if (~storage.filters.indexOf(filter))
											storage.filters.splice( storage.filters.indexOf(filter), 1);
									})
								}
							});
							// sort filters after removing old filters
							$timeout(function(){
								storage.filters.sort(function(a,b){
									return a.order > b.order;
								})
							})
						});
				},
				/**
				 * Get snippets by page
				 * @param offset {Integer} offset of the first asking snippet
				 * @param limit {Integer} limit of required snippets
				 * @return {Request} XHR object
				 */
				getResultsList: function (offset, limit) {
					storage.results.all = false;
					var startTime = new Date().getTime() / 1000;
					var request = new Request({
						type: "POST",
						dataType: 'json',
						url: "/qs/query/:queryId?offset=:offset&limit=:limit",
						cache: (offset===0),    // cache only first page
						bind: {
							queryId: SessionState.getCurrentState(),
							offset: offset,
							limit: limit || config.get('maxSnippetsInPage')
						},
						data: {
							"constraint": {
								"value": serializeDataToSend(),
								"negated": false,
								"logic": "AND",
								"type": "Constraints"
							},
							"sortings": {
								"value": storage.sorting
							}
						}
					});
					if (storage.results.loading === SessionState.getCurrentState()) {
						return request;
					} else {
						storage.results.loading = SessionState.getCurrentState();
						return request.done(function (data) {
							var dif = new Date().getTime() / 1000 - startTime;
							if (offset === 0)
								storage.requestDuration = +(dif > 99 ? dif.toPrecision(3) : dif.toPrecision(2)) || 0.01;
							if (data.snippets.length < (limit || config.get('maxSnippetsInPage'))) {
								storage.results.all = true;
							}
							_callbacks.putResultList(data.snippets);
						});
					}
				},
				/**
				 * load additional data
				 * @param snippet
				 * @return {Request} XHR object
				 */
				getSnippetData: function (snippet) {
					// do nothing if there are all interesting data.
					if ( (snippet.dataProperties || snippet.rows || snippet.columns) &&
						snippet.systemProperties && snippet.objectProperties && snippet.similars &&
						snippet.tags) {
						return new Request();
					}
					// get basic props
					snippet.loading = true;
					return new Request({
						url: "/qs/query/:executionId",
						dataType: 'json',
						type: 'POST',
						bind: {
							executionId: SessionState.getCurrentState()
						},
						data: {
							"constraint": {
								"value": snippet.uri,
								"negated": false,
								"type": "SubjectConstraint"
							}
						}
					}).then(function (data) {
						_callbacks.updateSnippetData(snippet, data.snippets[0]);
						_callbacks.findSpecialSystemProperties(snippet);
					});
				},
				getRichData: function (snippet) {
					if (snippet.rich) return new Request();
					// get rich props
					snippet.loading = true;
					return new Request({
						url: "/qs/query/:executionId/rich",
						dataType: 'json',
						type: 'GET',
						bind: {
							executionId: SessionState.getCurrentState()
						},
						data: {
							uri: snippet.uri
						}
					}).then(function(data) {
						snippet.rich = true;
						_callbacks.updateSnippetData(snippet, data);
						_callbacks.findSpecialSystemProperties(snippet);
					});
				},

				/**
				 * load template for snippet
				 * @param snippet
				 * @return {Array} of templates
				 */
				getTemplateForSnippet: function (snippet) {
					if (!snippet.categories) return [];
					if (!snippet.dataProperties) return [];
					var rich = [],
						cache = {};
					angular.forEach(snippet.dataProperties, function (dataProperty) {
						cache[dataProperty.uri] = dataProperty.value;
					});
					var categoryPreviewImage = null;
					angular.forEach(snippet.categories.value, function (category) {
						if (categoryPreviewImage === null && category.previewImage) categoryPreviewImage = category.previewImage;
					});
					angular.forEach(snippet.categories.value, function (category) {
						switch (category.uri) {
							case "https://purl.inforbix.com/api/ontologies/files/20120910/File":
								rich.push({
									priority: 10,
									type: "template",
									template: "<p>{{size | bytes:2}}<span style='color:grey; margin: 0 10px'>•</span>Created by {{author}} on {{createDate | date:'short'}}<span style='color:grey; margin: 0 10px'>•</span>Last modified by {{author}} on {{modifyDate | date:'short'}}</p>",
									values: {
										typeImage: categoryPreviewImage,
										size: cache["https://purl.inforbix.com/api/ontologies/files/20120910/fileSize"],
										type: cache["https://purl.inforbix.com/api/ontologies/files/20120910/fileType"],
										modifyDate: cache["https://purl.inforbix.com/api/ontologies/files/20120910/lastModified"],
										createDate: cache["https://purl.inforbix.com/api/ontologies/files/20120910/creationDate"],
										author: cache["https://purl.inforbix.com/api/ontologies/relations/20120910/byPerson"]
									}
								});
								break;
							case "https://purl.inforbix.com/api/ontologies/inventor/20120910/InventorDocument":
								var description = cache["https://purl.inforbix.com/api/ontologies/inventor/20120910/description"];
								if(description) rich.push({priority: 0, type: "text", value: description});
								rich.push({
									priority: 20,
									type: "template",
									template: "<p><b>{{part}}</b><span ng-if='material'> made of <i>{{material}}</i></span><br>Mass: {{mass}}, surface area: {{area}}</p>",
									values: {
										part: cache["https://purl.inforbix.com/api/ontologies/inventor/20120910/part_Number"],
										mass: cache["https://purl.inforbix.com/api/ontologies/inventor/20120910/mass"],
										area: cache["https://purl.inforbix.com/api/ontologies/inventor/20120910/surfaceArea"],
										material: cache["https://purl.inforbix.com/api/ontologies/inventor/20120910/material"]
									}
								});
								break;
							case "https://purl.inforbix.com/api/ontologies/test/20120910/Employee":
								rich.push({
									priority: 10,
									type: "template",
									template: "<p>{{department}}<span style='color:grey; margin: 0 10px'>•</span><a ng-if='email' ng-href='mailto:{{email}}'>{{email}}</a><span style='color:grey; margin: 0 10px'>•</span><span ng-if='phone'>{{phone}}</span></p>",
									values: {
										department: cache["https://purl.inforbix.com/api/ontologies/test/20120910/department"],
										email: cache["https://purl.inforbix.com/api/ontologies/test/20120910/email"],
										phone: cache["https://purl.inforbix.com/api/ontologies/test/20120910/phone"]
									}
								});
								break;
							case "https://purl.inforbix.com/api/ontologies/test/20120910/Company":
								rich.push({
									priority: 10,
									type: "template",
									template: "<p>{{address}}<br /><a ng-if='site' ng-href='{{site}}'>{{site}}</a><span ng-if='phone'><span style='color:grey; margin: 0 10px'>•</span>{{phone}}</span></p>",
									values: {
										address: cache["https://purl.inforbix.com/api/ontologies/test/20120910/address"],
										site: cache["https://purl.inforbix.com/api/ontologies/test/20120910/site"],
										phone: cache["https://purl.inforbix.com/api/ontologies/test/20120910/phone"]
									}
								});
								break;
						}
					});
					rich.sort(function (a, b) {
						return a.priority > b.priority;
					});
					return rich;
				},

				/**
				 * Load categories for current search
				 * @param full {Boolean} Short or full list of properties
				 * @return {Request} XHR object
				 */
				getCategoriesList: function (full) {
					var request = new Request({
						type: "POST",
						url: "/qs/query/:queryId/categories?resultSize",
						dataType: 'json',
						cache: true,
						bind: {
							queryId: SessionState.getCurrentState()
						},
						data: {
							"constraint": {
								"value": serializeDataToSend(),
								"negated": false,
								"logic": "AND",
								"type": "Constraints"
							},
							"sortings": {
								"value": storage.sorting
							}
						}
					});

					if (storage.categories.loading === SessionState.getCurrentState()) {
						return request;
					} else {
						storage.categories.loading = SessionState.getCurrentState();
						return request.done(function (data) {
							_callbacks.putCategories(data.categories);
						});
					}
				},
				/**
				 * Load tags for current search
				 * @return {Request} XHR object
				 */
				getTagsList: function(){
					var request = new Request({
						type: "POST",
						url: "/qs/qs-tags/",
						dataType: 'json',
						cache: true,
						// bind: { queryId: SessionState.getCurrentState() },
						data: {
							"constraint": {
								"value": serializeDataToSend(),
								"negated": false,
								"logic": "AND",
								"type": "Constraints"
							},
							"sortings": {
								"value": storage.sorting
							}
						}
					});

					if (storage.tags.loading === SessionState.getCurrentState()) {
						return request;
					} else {
						storage.tags.loading = SessionState.getCurrentState();
						return request.done(function(data){
							_callbacks.putTags(data);
						});
					}
				},

				/**
				 * Load facet for current search
				 * @return {Request} XHR object
				 */
				getFacetList: function() {
					var request = new Request({
						type: "POST",
						url: "/qs/query/:queryId/facets",
						dataType: 'json',
						cache: true,
						bind: {
							queryId: SessionState.getCurrentState()
						},
						data: {
							"constraint": {
								"value": serializeDataToSend(),
								"negated": false,
								"logic": "AND",
								"type": "Constraints"
							},
							"sortings": {
								"value": storage.sorting
							}
						}
					});

					if (storage.facets.loading === SessionState.getCurrentState()) {
						return request;
					} else {
						storage.facets.loading = SessionState.getCurrentState();
						return request.done(function (data) {
							_callbacks.putFacets(data.facets);
						});
					}
				},

				getResultCount: function(){
					var request = new Request({
						type: "POST",
						url: "/qs/query/:queryId/categories?resultSize",
						dataType: 'json',
						cache: true,
						bind: {
							queryId: SessionState.getCurrentState()
						},
						data: {
							"constraint": {
								"value": serializeDataToSend(),
								"negated": false,
								"logic": "AND",
								"type": "Constraints"
							},
							"sortings": {
								"value": storage.sorting
							}
						}
					})
					return request.done(function (data) {
						_callbacks.putResultCount(data.resultSize);
					});
				},

				getQueryById: function(queryId){
					return new Request({
						type: "GET",
						url: "/qs/query/storage/:query/",
						dataType: 'json',
						bind: {
							query: queryId
						}
					});
				},

				suggestFilter: (function () {
					var suggestion = {};
					return function (opt, cb) {
						var delay = opt.delay || 300;
						$timeout.cancel(suggestion.timer);
						if (suggestion.request && suggestion.request.abort) {
							suggestion.request.abort();
							suggestion.request = null;
						}
						suggestion.timer = $timeout(function () {
							suggestion.request = _getters.getSuggestions(opt).done(cb);
						}, delay);
					}
				}()),
				getSuggestions: function (opt) {
					return new Request({
						url: "/qs/suggestions/:queryId/?searchString=:searchString&executionId=:queryId&limit=10&dataProperties=:dataProperties&saved=:saved&history=:history",
						type: "POST",
						priority: 3,
						dataType: 'json',
						bind: {
							queryId: SessionState.getCurrentState(),
							searchString: opt.token,
							dataProperties: opt.suggestByProperty,
							saved: false,
							history: false
						},
						data: {
							"constraint": {
								"value": serializeDataToSend(),
								"negated": false,
								"logic": "AND",
								"type": "Constraints"
							},
							"sortings": {
								"value": storage.sorting
							}
						}
					});
				},

				loadHistory: function(){
					storage.recent.loading = SessionState.getCurrentState();
					_getters.getRecent().done(function(data){
						storage.recent.splice(0).push.apply(storage.recent, data);
						storage.recent.loading = false;
					});

					storage.savedQueries.loading = SessionState.getCurrentState();
					_getters.getSaved().done(function(data){
						storage.savedQueries.splice(0).push.apply(storage.savedQueries, data);
						storage.savedQueries.loading = false;
					});
				},

				getRecent: function (limit){
					return new Request({
						url: "/qs/query/history/?limit=:limit",
						type: "GET",
						priority: 5,
						dataType: "json",
						cache: false,
						bind: {
							limit: limit || 50
						}
					});
				},

				getSaved: function (limit){
					return new Request({
						url: "/qs/query/saved/?limit=:limit",
						type: "GET",
						priority: 5,
						dataType: "json",
						cache: false,
						bind: {
							limit: limit || 1000
						}
					});
				},

				/**
				 * Get saved search name from session storage
				 * @returns {String} saved search name
				 */
				getSavedSearchName: function(){
					return sessionStorage.getItem("ibxSavedSearchName") || '';
				},

				/**
				 *
				 * TABLES METHODS SECTION
				 */
				getTableData: function (offset, limit, backgroundload) {
					limit = limit ? limit + 1 : config.get("rowsLoadCount");
					offset = offset || 0;
					var startTime = new Date().getTime() / 1000,
						self = this,
						res;

					storage.rows.all = false;

					if (!backgroundload) {
						if (offset === 0)
							storage.requestDuration = 0;
					}

					var prepareColumns = function (columns){
						var prepared = [];
						angular.forEach(columns, function(col){
							var newc = {uri: col.uri};
							prepared.push(newc);
						});
						return prepared;
					};

					var request = new Request({
						type: "POST",
						dataType: 'json',
						url: "/qs/query/:queryId/table?offset=:offset&limit=:limit",
						cache: (offset===0),    // cache only first page
						bind: {
							queryId: SessionState.getCurrentState(),
							offset: offset,
							limit: limit
						},
						data: {
							constraint: {
								value: serializeDataToSend(),
								negated: false,
								logic: "AND",
								type: "Constraints"
							},
							"sortings": {
								"value": storage.sorting
							},
							askedColumns: prepareColumns(storage.columns.length ? storage.columns : storage.askedColumns)
						}
					});
					var prepareRows = function (tableRows) {
						var prepared = [],
							newRow;

						angular.forEach(tableRows, function(row){
							newRow = {uri: row.uri};
							angular.forEach(row.value, function(cell){
								newRow[cell.uri] = cell.value;
							});
							prepared.push(newRow);
						});

						return prepared;
					}

					//update columns
					if (!storage.columns || !storage.columns.length){
						if(storage.columns.loading===SessionState.getCurrentState()) {
							res = request;
						} else {
							storage.columns.loading=SessionState.getCurrentState();
							res = request.done(function(data){
								_callbacks.putColumns(data.table.columns);
							});
						}
					}
					//update rows
					if (storage.rows.loading === SessionState.getCurrentState()) {
						res = request;
					} else {
						if (!backgroundload) storage.rows.loading = SessionState.getCurrentState();
						res = request.then(function (data) {
							return prepareRows(data.table.rows)
						}).done(function (data) {
							if (offset === 0){
								storage.rows.splice(0);
							}
							if (data.length < limit) {
								storage.rows.all = true;
							}
							_callbacks.putRows(data, offset, startTime, backgroundload)
						});
					}
					//clear load query state
					if (storage.savedQueries.loading){
						res = request.done(function(){
							$timeout(function () {
								storage.savedQueries.loading = false;
							}, 0);
						});
					}

					return res;

				},
				getTableColumns:function(filter, offset, limit){
					limit = limit || config.get("propsLoadCount");
					offset = offset || 0;

					var filterPresence = filter && !angular.isUndefined(filter);
					//clear columns list
					if (offset === 0){
						storage.allcolumns.splice(0);
					}

					storage.allcolumns.all = false;

					var request = new Request({
						type: "POST",
						dataType: 'json',
						url: "/qs/query/:queryId/table/columns?filter=:filter&offset=:offset&limit=:limit",
						cache: false,
						bind: {
							queryId: SessionState.getCurrentState(),
							filter: filterPresence ? filter.toLowerCase() : "",
							offset: offset,
							limit: limit
						},
						data: {
							constraint: {
								value: [],
								negated: false,
								logic: "AND",
								type: "Constraints"
							},
							askedColumns: []
						}
					});
					if (storage.allcolumns.loading === SessionState.getCurrentState()) {
						return request;
					} else {
						storage.allcolumns.loading = SessionState.getCurrentState();
						if (offset === 0){
							storage.allcolumns.splice(0);
						}
						return request.done(function (data) {
							storage.allcolumns.loading = false;

							if (data.length < limit) {
								storage.allcolumns.all = true;
							}

							_callbacks.putRequestedColumns(data);
						});
					}
				},
				updateTableSorting: function (sorting){
					var prepareSortingFields = function(sorting){
						var prepared = [];
						angular.forEach(sorting, function(val, idx){
							prepared.push(val);
						})
						return prepared;
					}

					storage.sorting = prepareSortingFields(sorting);
					this.getTableData();
				},
				deleteSavedSearch: function(item){
					if (!item) return;
					return new Request({
						url: "/qs/query/saved/?label=:label&application=:application",
						bind: {
							label: item.label,
							application: item.application
						},
						cashe: false,
						type: "DELETE",
						dataType: "json"
					});
				},

				getPropertyValues: function (propertyUri, needle) {
					return new Request({
						url: "/api/semantics/dataPropertyValues?dataProperty=:property&dataPropertyValuesLabel=:mask&dataPropertyValuesLimit=:limit&dataPropertyValuesOffset=:offset&_=true",
						bind: {
							property: propertyUri,
							mask: needle.length ? needle + "*" : "",
							offset: 0,
							limit: 10
						},
						cache: false,
						type: 'GET',
						dataType: 'json'
					});
				},

				getRichRelated: function (query, cb) {
					_setters.searchOneCriteria(query, function (data) {
						var request = new Request({
							url: '/api/results/:queryId',
							dataType: 'json',
							type: 'GET',
							data: {
								snippets: "",
								snippetsOffset: 0,
								snippetsLimit: 10,
								snippetSystemProperties: ""
								//objectProperties: "",
								//objectPropertiesPreviewsLimit: 5
							},
							bind: {
								queryId: data.id
							}
						}).done(function (data) {
								cb(data)
							});
					})
				}
			},

			/**
			 * Handle data callbacks. Can be used if you need to emulate success callbacks with exist data.
			 */
			_callbacks = {
				putFilterQuery: function (filterQuery) {
					// check if criteria already exists
					var position = -1;
					angular.forEach(storage.filters, function (filter, pos) {
						if (Object.getPrototypeOf(filter) === Object.getPrototypeOf(filterQuery) && filterQuery.equal(filter))
							position = pos;
					});
					return position === -1 ? storage.filters.push(filterQuery) - 1 : position;
				},

				putNewFilter: function (filter) {
					// add to storage
				},

				updateSnippetData: function (snippet, data) {
					// extend snippet with new data;
					angular.extend(snippet, data);
					snippet.loading = false;    // stop loading
				},

				findSpecialSystemProperties: function (snippet) {
					// search additional properties
					var prepareURL = function(url){
						if (!~url.indexOf('https')) {
							url = config.get("apiDomain") + url;
						}
						return url;
					};
					snippet.snippetID = { value: "" }
					snippet.systemProperties && angular.forEach(snippet.systemProperties, function (item, i) {	// FIXME pull sheet
						switch (item.uri) {
							case "https://purl.inforbix.com/api/ontologies/relations/20120910/previewImage":
								item.value = prepareURL(item.value);
								snippet.previewImage = item;
								break;
							case "https://purl.inforbix.com/api/ontologies/relations/20120910/snippetID":
								angular.extend(snippet.snippetID, item);
								break;
							case config.get('uris').locationUri:
								snippet.location = item.value;
								break;
							case config.get('uris').computerNameUri:
								snippet.pcname = item.value;
								break;
							case config.get('uris').isLatestRevision:
								if (item.value == "false")
									snippet.isOld = true;
								break;
							case "https://purl.inforbix.com/api/ontologies/a360hmd/20120910/textContent":
								snippet.description = item.value;
								break;
							case "https://purl.inforbix.com/api/ontologies/relations/20120910/externalLink":
								snippet.snippetID.externalLink = item;
								break;
							case "https://purl.inforbix.com/api/ontologies/revisions/20120910/deletedSystem":
								snippet.snippetID.deletedSystem = item;
								break;
							case config.get('uris').lastUpdateTimeURI :
								snippet.lastUpdateTime = new Date(item.value);
								break;
							case "https://purl.inforbix.com/api/ontologies/a360hmd/20120910/ownerId":
								!snippet.links && (snippet.links = {});
								snippet.links.user = item;
								break;
							case "https://purl.inforbix.com/api/ontologies/a360hmd/20120910/inProject":
								!snippet.links && (snippet.links = {});
								snippet.links.project = item;
								break;
						}
					});

					snippet.objectProperties && angular.forEach(snippet.objectProperties.value, function (item) {	// FIXME pull sheet
						if (item.uri === config.get('uris').tableLinkUri) {
							// remove this link from set
							// (not good solution) remove immediately to prevent rendering
							snippet.objectProperties.value.splice(snippet.objectProperties.value.indexOf(item), 1);
							// hardcode new button
							snippet.hasTableLink = item;
						}
					});


					snippet.hasBinaryRevisions = false;
					snippet.revisions && angular.forEach(snippet.revisions.value, function (r) {
						r.hasBinaryRevision && (snippet.hasBinaryRevisions = true);
					});

					if (snippet.columns) {
						var newColumns = [];
						angular.forEach(snippet.columns, function (column) {
							newColumns[ column.order - 1 ] = column;
						});
						snippet.columns = newColumns;
					}
					if (snippet.rows) {
						var newRows = [];
						angular.forEach(snippet.rows, function(row){
							var newRow = {
								label: row.label,
								order: row.order,
								source: row.source,
								uri : row.uri,
								value: []
							};
							angular.forEach(row.value, function(cell){
								newRow.value[cell.order -1] = cell;
							});
							newRows.push(newRow);
						});
						snippet.rows = newRows;
					}

					// rich additionals
					// table view
					if (snippet.objectProperties) {
						angular.forEach(snippet.objectProperties.value, function(op){
							if (op.previews && op.previews.length===1) {
								if (op.previews[0].categories[0].uri === "https://purl.inforbix.com/api/ontologies/inventor/20120910/InvBOMTable" ||
									op.previews[0].categories[0].uri === "https://purl.inforbix.com/api/ontologies/inventor/20120910/InvParametersTable" ||
									op.previews[0].categories[0].uri === "https://purl.inforbix.com/api/ontologies/excel/20120910/ExcelWorksheet") {
									// get table snippet and replace this preview content
									return new Request({
										url: "/api/snippets/",
										dataType: 'json',
										type: 'GET',
										data: {
											uri: op.previews[0].uri,
											rows: "", columns: "",
											rowsOffset: 0,
											rowsLimit: 3
										},
										cache: false
									}).then(function (data) {
											var snippet = data.snippet;
											snippet.uri = op.previews[0].uri;
											snippet.hasTableLink = {
												uri: "https://purl.inforbix.com/api/ontologies/relations/20120910/tableHasRow",
												label: "Table contains",
												source: op.previews[0].source
											}
											_callbacks.findSpecialSystemProperties( snippet );  // prepare rows and columns
											snippet.snippetID = { value: op.previews[0].label }
											op.previews[0].snippet = snippet;

										});
								}
							}
						});
					}


					snippet.hasBinaryRevisions=false;
					snippet.revisions && angular.forEach(snippet.revisions.value,function(r){
						r.hasBinaryRevision && (snippet.hasBinaryRevisions=true);
					});

					// applet buttons
					snippet.actions = []; // reset
					snippet.categories&&angular.forEach(snippet.categories.value, function(item){
						if (item.uri === "https://purl.inforbix.com/api/ontologies/files/20120910/File") {
							snippet.actions.push({
								"label": "Open",
								"code": "this.applet.open( this.get(SemaHelper.networkPathUri)?this.get(SemaHelper.networkPathUri).value:this.get(SemaHelper.locationUri).value, this.get(SemaHelper.computerNameUri).value);",
								"order": 0
							});
							snippet.snippetID.action = {
								"label": "Open directory",
								"code": "this.applet.open( this.applet.splitPath( this.get(SemaHelper.networkPathUri)?this.get(SemaHelper.networkPathUri).value:this.get(SemaHelper.locationUri).value ).dirPart, this.get(SemaHelper.computerNameUri).value ); "
							};
						} else if (item.uri === "https://purl.inforbix.com/api/ontologies/files/20120910/Directory"){
							snippet.snippetID.action = {
								"label": "Open directory",
								"code": "this.applet.open( this.get(SemaHelper.networkPathUri)?this.get(SemaHelper.networkPathUri).value:this.get(SemaHelper.locationUri).value, this.get(SemaHelper.computerNameUri).value);"
							};
						} else if (item.uri === "https://purl.inforbix.com/api/ontologies/plm360/20120910/Attachment") {
							snippet.actions.push({
								"label": "Open",
								"code": " var url = this.get('systemProperties').get(SemaHelper.downloadLink).value; if (url) {	window.open(url); } else {	Inforbix.Util.alert(\"Sorry, there is no download link\"); } "
							});
						}
					});
				},

				putResultCount: function (count) {
					storage.totalCount = count;
				},

				putResultList: function (snippets) {
					storage.results.loading = false;
					angular.forEach(snippets, function (snippet) {
						_callbacks.findSpecialSystemProperties(snippet);
						storage.results.push(snippet);
					});
				},
				putCategories: function(categories){
					storage.categories.loading = false;
					storage.categories.splice(0).push.apply(storage.categories, categories);
				},
				putTags: function(tags) {
					storage.tags.loading = false;
					storage.tags.splice(0).push.apply(storage.tags, tags);
				},
				putFacets: function(facets) {
					storage.facets.loading = false;
					var stored;
					// store latest facet to future
					angular.forEach(storage.facets, function(facet){
						if (facet.latest) {
							stored = facet;
						}
					});
					// copy object to prevent changes
					var newFacet = angular.copy(facets);
					// change updated facet to stored
					stored && angular.forEach(newFacet, function(facet, i){
						if (facet.uri === stored.uri) {
							facet.values = stored.values;
						}
					});
					storage.facets.splice(0).push.apply(storage.facets, newFacet);
				},
				putColumns: function(columns){
					storage.columns.splice(0).push.apply(storage.columns,remapColumns(columns));
					storage.askedColumns.splice(0);
					storage.columns.loading = false;
					storage.columns.needUpdate = false;
				},
				putRows: function(rows, offset, startTime, backgroundload){
					var dif = new Date().getTime() / 1000 - startTime;
					if (!backgroundload) {
						if (offset === 0)//check time only for first results
							storage.requestDuration = +(dif > 99 ? dif.toPrecision(3) : dif.toPrecision(2)) || 0.01;
						storage.rows.push.apply(storage.rows, rows);
					}
					storage.rows.loading = false;
				},
				putRequestedColumns: function(data){
					data = remapColumns(data);
					storage.allcolumns.push.apply(storage.allcolumns, data);
				},

				getSupportedFeatures: function () {
					new Request({
						url: '/qs/query/capabilities/',
						dataType: 'json',
						type: 'GET'
					}).done(function (data) {
							config.set("supportedFeatures", data);
						});
				}
			};

		// watch on
		SessionState.onChange(function (newValue, oldValue) {
			if (!SessionState.getCurrentState()) return;

			var notSilent = function(){
				return (SessionState.getCurrentState() && SessionState.getSilentId() !== SessionState.getCurrentState())
			}

			var next = function () {
				return new Request();
			}
			if (notSilent()) {
				if (newValue !== oldValue) {
					storage.selectedSnippet = null;
				}
			}
			// call getters
			// 1) snippets
			storage.results.length = 0; // clear result for first page
			_callbacks.putResultCount(null);


			// 1) Load search results
			;(  properties.load.results && _getters.getResultsList(0) ||  // load snippets result
				properties.load.table && notSilent() && _getters.getTableData() || // or table snippets
				next() ).then(function(){   // or pass to the next function in queue
					// 2.1) categories
					;(properties.load.categories ? _getters.getCategoriesList() : next()).then(function(){

					});
					// 2.2) tags
					!(properties.load.tags ? _getters.getTagsList() : next()).then(function(){

					});
					// 2.3) result size
					;(properties.load.resultCount ? _getters.getResultCount() : next()).then(function(){
						// something else
					});

					// 2.4) load history
					properties.load.history && notSilent() && _getters.loadHistory();

					// 2.5) facets
					;(properties.load.facet ? _getters.getFacetList() : next()).then(function(){
						// something else
					});
			});

			// free backend resources last query
			if (oldValue && newValue !== oldValue && SessionState.getSilentId() !== newValue) {
				new Request({
					url: '/qs/query/' + oldValue,
					type: 'DELETE',
					data: {}
				});
			}
		});

		ApplicationState.onChange(function (newValue, oldValue) {
			storage.currentApp = newValue;
		});

		return angular.extend({}, _setters, _getters, _callbacks);
	}
	service.$inject = [ "Request", "ibxStorage", "$timeout", "ibxConfig", "IbxQueryFilter", "SessionState", "ApplicationState" ];
	app.factory("ibxBackend", service);
	return service;
})
