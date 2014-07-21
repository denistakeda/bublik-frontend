define([
	'ibxApp',
	'angular'
], function(app, angular){
	"use strict";

	// some setting here
	var settings = {
		disableLargePreviews: false,
		maxSnippetsInPage: 10,
		rowsLoadCount: 10,
		propsLoadCount: 30,
		defaultColumnCount: 8,
		supportedFeatures: {
			tables: false,
			facets: false,
			attributeFilters: false
		},
		uris: {
			filesizeUri: "https://purl.inforbix.com/api/ontologies/files/20120910/fileSize",
			fileCategory: "https://purl.inforbix.com/api/ontologies/files/20120910/File",
			tagUri: "https://purl.inforbix.com/api/ontologies/relations/20120910/taggedWith",
			locationUri: "https://purl.inforbix.com/api/ontologies/relations/20120910/location",
			snippetIdUri: "https://purl.inforbix.com/api/ontologies/relations/20120910/snippetID",
			categoryUri: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
			imageUri: "https://purl.inforbix.com/api/ontologies/relations/20120910/previewImage",
			fileNameUri: "https://purl.inforbix.com/api/ontologies/files/20120910/fileName",
			lastRevisionUri: "https://purl.inforbix.com/api/ontologies/revisions/20120910/lastRevision",
			timelineUri: "https://purl.inforbix.com/api/ontologies/relations/20120910/lastUpdateTime",
			tableOrderUri: "https://purl.inforbix.com/api/ontologies/relations/20120910/tableOrder",
			computerNameUri: "https://purl.inforbix.com/api/ontologies/files/20120910/computerName",
			tableLinkUri: 'https://purl.inforbix.com/api/ontologies/relations/20120910/tableHasRow',
			fileExtension: "https://purl.inforbix.com/api/ontologies/files/20120910/extension",
			diskDrive: "https://purl.inforbix.com/api/ontologies/files/20120910/drive",
			authorUri: "https://purl.inforbix.com/api/ontologies/files/20120910/author",
			isLatestRevision: "https://purl.inforbix.com/api/ontologies/revisions/20120910/isLatestRevision",
			deletedURI: "https://purl.inforbix.com/api/ontologies/revisions/20120910/deleted",
			tableRow: "https://purl.inforbix.com/api/ontologies/relations/20120910/TableRow",
			context: "https://purl.inforbix.com/api/ontologies/relations/20120910/Context",
			lastUpdateTimeURI: "https://purl.inforbix.com/api/ontologies/relations/20120910/lastUpdateTime"
		},
		tables: {
			mincolwidth: 80,
			imagewidth: 72,
			booleanwidth: 80
		},
		sortableTypes: ["string", "numeric", "double", "boolean", "date"],
		filterableTypes: ["category", "string", "numeric", "double", "boolean", "date"],
		getImagePath: function(path){
			return require.toUrl("img" + path);
		},
		getBottomEdge: function(){
			return angular.element(window).height() - 30
		},
		specificProperties: {
			"https://purl.inforbix.com/api/ontologies/pdffile/20120910/PdfFile": {
				alias: "pdf",
				"properties": {
					"created": "https://purl.inforbix.com/api/ontologies/pdffile/20120910/creationDate",
					"author": "https://purl.inforbix.com/api/ontologies/pdffile/20120910/author",
					"pageCount": "https://purl.inforbix.com/api/ontologies/pdffile/20120910/pageCount"
				}
			},
			"https://purl.inforbix.com/api/ontologies/plm360/20120910/PLM360Item": {
				"alias": "plmitem",
				"properties": {
					"author": "https://purl.inforbix.com/api/ontologies/plm360/20120910/createdBy",
					"workflowState": "https://purl.inforbix.com/api/ontologies/plm360/20120910/workflowState",
					"lifecycleState": "https://purl.inforbix.com/api/ontologies/plm360/20120910/lifecycleState"
				}
			},
			"https://purl.inforbix.com/api/ontologies/autocad/20120910/AutoCADFile": {
				alias: "autocad",
				properties: {
					"title": "https://purl.inforbix.com/api/ontologies/autocad/20120910/title",
					"author": "https://purl.inforbix.com/api/ontologies/autocad/20120910/author"
				}
			},
			"https://purl.inforbix.com/api/ontologies/files/20120910/File": {
				"alias": "file",
				"properties": {
					"created": "https://purl.inforbix.com/api/ontologies/files/20120910/creationDate",
					"filename": "https://purl.inforbix.com/api/ontologies/files/20120910/fileName",
//						"fullname":"https://purl.inforbix.com/api/ontologies/files/20120910/fullName",
					"filesize": "https://purl.inforbix.com/api/ontologies/files/20120910/fileSize"//,
//						"filenameWithoutExtension":"https://purl.inforbix.com/api/ontologies/files/20120910/fileNameWithoutExtension"
				}
			}
		},
		showUngroupedProperties: false,  // https://git.autodesk.com/inforbix/unisearch-ui/issues/7
		apiDomain: "",
		searchPageUrl: "/inforbix/web/unisearch/",
		/**
		 * Provides a deferred with headers that will be sent in requests to API
		 */
		getApiHeaders: function(cb){
			cb();
		},
		viewingServiceToken: "https://viewing-dev.api.autodesk.com/viewingservice/v1/token"
	};
	// service
	var service = function($window){
		return {
			/**
			 * Getter
			 * @param attr {String} Searching key
			 * @return {Mixed} Value of key or null if there is no key.
			 */
			get: function(attr){
				if (!angular.isUndefined(settings[attr])) {
					return settings[attr];
				} else {
					// console.log( 'Settings '+attr+' does not exists' );
					return null;
				}
			},
			/**
			 * Setter
			 * @param attr {Mixed} Array with {key: value} or key {String}
			 * @param v {Mixed} {Optional} New value. Must be empty if first key is array.
			 */
			set: function(attr, v){
				var put = function(attr, v){
					settings[attr] = v;
				}
				if (typeof attr == 'object' && typeof v == 'undefined') {
					angular.forEach(attr, function(k, v){
						put(k, v);
					});
				} else {
					put(attr, v);
				}
			},

			isSortableType: function(type){
				var t = this.getSimpleType(type);
				return !!~settings.sortableTypes.indexOf(t);
			},
			isFilterableType: function(type){
				var t = this.getSimpleType(type);
				return !!~settings.filterableTypes.indexOf(t);
			},
			getSimpleType: function(dataType){
				var out = "string";
				if (angular.isObject(dataType))
					dataType = dataType.uri;
				switch (dataType) {
					case "http://www.w3.org/2001/XMLSchema#string":
					case "string":
						out = "string";
						break;
					case "http://www.w3.org/2001/XMLSchema#boolean":
					case "boolean":
						out = "boolean";
						break;

					case 'http://www.w3.org/2001/XMLSchema#integer':
					case 'http://www.w3.org/2001/XMLSchema#int':
					case 'http://www.w3.org/2001/XMLSchema#numeric':
					case 'numeric':
						out = "numeric";
						break;
					case 'http://www.w3.org/2001/XMLSchema#double':
						out = "double";
						break;
					case 'http://www.w3.org/2001/XMLSchema#date':
					case 'http://www.w3.org/2001/XMLSchema#dateTime':
					case 'http://www.w3.org/2001/XMLSchema#time':
					case 'date':
						out = "date";
						break;
					case "http://www.w3.org/2000/01/rdf-schema#Class":
						out = "category";
						break;
					case "https://purl.inforbix.com/api/ontologies/relations/20120910/dataType#previewImage":
						out = "image";
						break;
					default:
						out = "unknown";
						//console.error("Unknown dataType %s", dataType); //not necessary
						break;
				}
				return out;
			}
		}
	};
	service.$inject = ["$window"];
	app.factory("ibxConfig", service);
	return function(opt){
		angular.extend(settings, opt);
		return angular.copy(settings);
	};
});
