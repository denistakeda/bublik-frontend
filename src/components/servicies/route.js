define([
	'ibxApp',
	'angular'
], function(app, angular){
	"use strict";

	// service
	var service = function($rootScope){


		var routeParams = {};

		// some setting here
		var settings = {
			delimiter: '&',
			paths: []
		}

		var parse = function(hash){
			if (hash.indexOf('#') === 0) hash = hash.substr(1);
			routeParams = {};	// renew
			angular.forEach(settings.paths, function(path){
				var p = path;
				// try to search params
				// get variable list
				var variables = p.match(/:\w+/g);
				// and change them to (\w+)
				var matches = hash.match(new RegExp(p.replace(/:\w+/g, "([^&]+)")));
				if (variables && matches) {	// we found results!
					angular.forEach(variables, function(item, i){
						routeParams[item.substr(1)] = matches[i + 1]
					});
				}
			});
		};

		var putInHash = function(k, v){
			var hash = window.parent.location.hash, updatedhash = "";
			// search key 'k' in paths
			angular.forEach(settings.paths, function(path){
				var p = path;
				// get variable list
				var variables = p.match(/:\w+/g);
				if (variables && ~variables.indexOf(':' + k)) {	// need change variable with current path!
					// find position of path with hardcoded value
					var newPart = path.replace(new RegExp(':' + k, 'gi'), '-#-');
					// replace other variables to there \w+
					newPart = newPart.replace(/:\w+/g, "[^&]+");
					// replace hardcoded back
					newPart = '(' + newPart.replace('-#-', ')[^&]+(') + ')';

					updatedhash = hash.replace(new RegExp(newPart), "$1" + v + "$2");
					if (updatedhash === hash && v && !~hash.search(new RegExp(newPart))) {
						// need to add key+value
						newPart = path.replace(new RegExp(':' + k, 'gi'), v);
						angular.forEach(variables, function(vrbl){
							if (vrbl == k) return;
							newPart = newPart.replace(new RegExp(':' + vrbl, 'gi'), routeParams[vrbl]);
						});
						updatedhash = hash + (hash.length ? '&' : '') + newPart;
					}
				}
			});

			window.parent.location.hash = updatedhash;
			parse(window.parent.location.hash);
		}

		window.parent.window.onhashchange = function(){
			parse(window.parent.location.hash);
			$rootScope.$$phase || $rootScope.$digest();
		}

		return {
			configure: function(opt){
				angular.extend(settings, opt);
				parse(window.parent.location.hash)	// refresh
			},
			/**
			 * Add new listener
			 * @param path {String} path
			 * Use ':variable' to set variable value
			 */
			addPath: function(path){
				if (!~settings.paths.indexOf(path))	// searching for duplicates.
					settings.paths.push(path);
				parse(window.parent.location.hash)	// refresh
			},

			/**
			 * Getter
			 * @param attr {String} Searching key
			 * @return {Mixed} Value of key or null if there is no key.
			 */
			get: function(attr){
				if (routeParams[attr]) {
					return routeParams[attr];
				} else {
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
					putInHash(attr, v);
				}
				if (typeof attr == 'object' && typeof v == 'undefined') {
					angular.forEach(attr, function(k, v){
						put(k, v);
					});
				} else {
					put(attr, v);
				}
				$rootScope.$$phase || $rootScope.$digest();	// TODO can be problem with performance
			},
			makeUrl: function(params, absolute){
				var url = "";
				angular.forEach(params, function(val, key){
					url += key + "=" + val + "&";
				})
				url = '#' + url.substr(0, url.length - 1);
				if (absolute) url = window.parent.location.pathname + url;
				return url;
			}
		}
	};
	service.$inject = ["$rootScope"];
	app.factory("Route", service);
});