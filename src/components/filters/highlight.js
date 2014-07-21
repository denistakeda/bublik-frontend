define([
	'ibxApp',
	'angular',
	'components/filters/stringFilters',
	'components/factories/QueryFilter',
	'components/factories/SessionState',
	'components/services/storage'
], function(app, angular){
	"use strict";

	var filter = function(storage, QueryFilter, SessionState, $filter){
		var cache = {};
		return function highlight(needle, haystack){
			var cacheKey = angular.toJson([needle, haystack]);
			if (!cache[SessionState.getCurrentState()]) {  // garbage collector
				cache = {};
				cache[SessionState.getCurrentState()] = {};
			}
			if (cache[SessionState.getCurrentState()][cacheKey]) return cache[SessionState.getCurrentState()][cacheKey];
			var out;//, queryString = storage.queryString;
			switch (haystack) {
				case "dataprop":
					angular.forEach(storage.filters, function(filter){
						if (filter.uri === needle.uri)
							needle.highlight = true;
					});
					break;
				case "lazy":
					out = "";
					if (!needle) {
						cache[SessionState.getCurrentState()][cacheKey] = out;
						return out;
					}
					if (needle.highlights) {
						// go throw
						var lastIndex = 0;
						angular.forEach(needle.highlights, function(range){
							out += needle.value.substr(lastIndex, range.beginIndex - lastIndex);
							var h = needle.value.substr(range.beginIndex, range.endIndex - range.beginIndex);
							out += "<span class='highlight'>" + $filter("htmlentities")(h) + "</span>";
							lastIndex = range.endIndex;
						});
						out += needle.value.substr(lastIndex);
					} else {
						/* out = needle.value; */
						// support not supported
						out = highlight($filter("htmlentities")(needle.value));
					}
					break;
//				case "string":
				default:
					out = needle.toString();
					if (!out || out === "null") {
						cache[SessionState.getCurrentState()][cacheKey] = out;
						return out;
					}
					// search by search token
					angular.forEach(storage.filters, function(criteria){
						if (!(criteria instanceof QueryFilter.FulltextSearch)) {  // or criteria.simpleType !== 'fulltext'
							return; // not fulltext search criteria, skip it
						}
						var token = criteria.searchString;

						// invalid token - there are only special symbols
						if (!/\w/.test(token)) {
							cache[SessionState.getCurrentState()][cacheKey] = out;
							return out;
						}

						var regToken;
						if (/^".+"$/.test(token)) {
							regToken = token.replace(/^"(.+)"$/, "$1");
							regToken = regToken.replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, "\\$1");
							out = out.replace(new RegExp("(" + regToken + ")", 'gi'), "<span class='highlight'>$1</span>");
							cache[SessionState.getCurrentState()][cacheKey] = out;
							return out;
						}
						token = token.replace(new RegExp("([!@#$^&%_+\\\"'\\\\=\\[\\]\\/\\{\\}\\(\\)\\|:;<>?,\\.])", 'g'), ' ');
						token = token.replace(/^\s*(.*)\s*$/, "$1").replace(/\s{2,}/g, " ");
						var tokens = /^".+"$/.test(token) ? [ token.replace(/^"(.+)"$/, "$1") ] : token.split(" ");
						angular.forEach(tokens, function(token){
							if (token !== "") {
								regToken = token;
								regToken = regToken.replace(/\*/g, "\\w*?");
								regToken += "(?=\\W|$|_)";
								var subs = out.split(/(<span\sclass=["']highlight['"]>.+?<\/span>)/);
								out = "";
								angular.forEach(subs, function(sub, i){
									if (i % 2) {
										out += sub;
									} else {
										out += sub.replace(new RegExp("(" + regToken + ")", 'gi'), "<span class='highlight'>$1</span>");
									}
								})
							}
						});
					});
			}
			cache[SessionState.getCurrentState()][cacheKey] = out;
			return out;
		}
	}
	filter.$inject = ["ibxStorage", "IbxQueryFilter", "SessionState", "$filter"];
	app.filter("ibxHighlight", filter);
	return app;
});