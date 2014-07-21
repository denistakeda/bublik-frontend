/**
 * Ajax layer
 */
define([
	'ibxApp',
	'jquery',
	'angular',
	'libs/jquery.cookie',
	'components/services/config',
	'components/factories/handleError'
], function(app, $, angular){
	"use strict";
	$.ajaxSetup({dataType: 'json'});
	/**
	 * Workaround for IE
	 * http://stackoverflow.com/questions/9160123/no-transport-error-w-jquery-ajax-call-in-ie
	 * we also can add 'crossDomain: true' to ajax options.
	 */
	$.support.cors = true;
	$.ajaxPrefilter(function(options, originalOptions, jqXHR){
		// security fix
//		jqXHR.setRequestHeader('X-Use-Backends', "elastic");
//		jqXHR.setRequestHeader('X-XSRF-Security', $.cookie('xsrf_security') || "");
//		jqXHR.setRequestHeader('Client-Timezone', new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1]);
	});
	var cache = {}, queue = [];
	var service = function($rootScope, $timeout, handleError, config){
		var parametrize = function(request, params){
			var self = this,
				url = request,
				val,
				encodedVal;

			function encodeUriQuery(val, pctEncodeSpaces){
				return encodeURIComponent(val).
					replace(/%40/gi, '@').
					replace(/%3A/gi, ':').
					replace(/%24/g, '$').
					replace(/%2C/gi, ',').
					replace((pctEncodeSpaces ? null : /%20/g), '+');
			}

			function encodeUriSegment(val){
				return encodeUriQuery(val, true).
					replace(/%26/gi, '&').
					replace(/%3D/gi, '=').
					replace(/%2B/gi, '+');
			}

			params = params || {};
			angular.forEach(params, function(_, urlParam){

				val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];

				if (angular.isDefined(val) && val !== null) {
					encodedVal = encodeUriSegment(val);

					url = url.replace(new RegExp(":" + urlParam + "(\\W|$)", "g"), encodedVal + "$1");
				} else {
					url = url.replace(new RegExp("/?:" + urlParam + "(\\W|$)", "g"), '$1');
				}


			});
			url = url.replace(/\/?#$/, '');

			url = url.replace(/\/*$/, '');
			return url;
		}

		var out = function(params){
			if (!params) {	// dummy
				var dummy = new $.Deferred();
				dummy.resolve({});  // Dummy resolved
//				dummy.reject(dummy, 'Dummy rejected');
				return dummy.promise({abort: angular.noop});
			}
			var attributes = angular.extend({}, params);		// don't change uri in original object!
			if (attributes.bind)
				attributes.url = parametrize(attributes.url, attributes.bind);

			var checkQueue = function(){
				// check
				var callFunctions = function(fs){
					angular.forEach(fs, function(f){
						if (angular.isFunction(f)) f();
					});
				}
				for (var i = 0; i < queue.length; i++) {
					// send request with 'i' priority
					if (queue[i] && queue[i].length > 0) {
						callFunctions(queue[i]);
						break;
					}
				}
			};

			var newRequest = function(){

				// create deferred and return promise
				var defered = new $.Deferred();
				defered.cancelRequest = function(){
				};

				var sendRequest = function(attributes){
					var xhr, requestDeferred = new $.Deferred();
					var abort = false;
					defered.cancelRequest = function(){
						abort = true;
						requestDeferred.reject();
					};
					config.get("getApiHeaders")(function(headers){
						if (abort) return;

						var xhrAttrs = angular.copy(attributes);
						xhrAttrs.headers = headers;
						if (xhrAttrs.type && xhrAttrs.type.toLowerCase() !== 'get') {
							xhrAttrs.contentType = "application/json; charset=UTF-8";
							xhrAttrs.data = angular.toJson(xhrAttrs.data);
						}
						if (!(/^https?:\/\//).test(xhrAttrs.url))
							xhrAttrs.url = config.get("apiDomain") + xhrAttrs.url;
						xhr = $.ajax(xhrAttrs);
						xhr.always(function(){	// Object #<Object> has no method 'abort'. So we don't return modified promise.
							$timeout(function(){	// fire after user's callback
								$rootScope.$$phase || $rootScope.$digest();
							}, 0);

							if (attributes.priority) {
								// remove self
								queue[attributes.priority].splice(queue[attributes.priority].indexOf(xhr), 1);
								// send others
								checkQueue();
							}
						});
						xhr.success(defered.resolve);
						xhr.fail(function(xhr, textstatus, errorthrown){
							defered.reject(xhr, textstatus, errorthrown);
							var response;
							if (xhr.statusText === "abort") return;   // if we made abort ignore this error
							if (xhr.state() == 'rejected' && xhr.readyState != 4) return;	// abort query
							try {
								response = angular.fromJson(xhr.responseText || '{}');
							} catch (err) {
								response = xhr.responseText;
							}
							handleError.httpError(response, xhr, attributes)
						});
						defered.cancelRequest = function(){
							xhr.abort();
						}
						return xhr;

					});

					return requestDeferred.promise();
				}
				if (!attributes.priority) { // send it immediately
					var xhr = sendRequest(attributes);
				} else {    // put in prior
					if (!queue[attributes.priority]) queue[attributes.priority] = [];
					var queueFunction = function(){
						var xhr = sendRequest(attributes);
						// remove self
						queue[attributes.priority].splice(queue[attributes.priority].indexOf(queueFunction), 1);
						// add new xhr
						queue[attributes.priority].push(xhr);
					};
					queue[attributes.priority].push(queueFunction);
					defered.cancelRequest = function(){
						queue[attributes.priority].splice(queue[attributes.priority].indexOf(queueFunction), 1);
					}
					$timeout(checkQueue, 10);
				}

				return defered.promise({
					abort: function(){
						defered.cancelRequest()
					}
				});


			}
			if (attributes.cache !== true) {    // force
				if (attributes.cache === false || attributes.type === 'PUT' || attributes.type === 'POST' || attributes.type === 'DELETE') {
					return newRequest();
				}
			}
			// cache by URL
			if (cache[attributes.url]) {
				if (!angular.equals(cache[attributes.url].params, params)) {
					// but new params can change response: create new object
					if (cache[attributes.url].xhr.state() !== "resolved")
						cache[attributes.url].xhr.abort();	// abort previous request;	// TODO add flag: some methods can be running parallel
					cache[attributes.url] = {
						params: params,
						xhr: newRequest()
					}
				}
			} else {
				cache[attributes.url] = {
					params: params,
					xhr: newRequest()
				}
			}
			return cache[attributes.url].xhr;
		}
		out.cancelAll = (function(){
			/**
			 * cancel all function
			 * Use <code>store : true</code> option to use storage pool.
			 * <code>Inforbix.RestAPI.cancelAll()</code> function can cancel all those requests
			 */
			var currentRequests = [];
			$.ajaxPrefilter(function(options, originalOptions, jqXHR){
				// security fix
//					jqXHR.setRequestHeader('X-XSRF-Security', $.cookie('xsrf_security') || "");

				var idx = currentRequests.push(jqXHR) - 1;
				jqXHR.url = options.url;
				jqXHR.always(function(){
					if (currentRequests[idx])
						delete currentRequests[idx];    // make 'undefined', do not splice
				});
			});
			return function(){
				angular.forEach(currentRequests, function(jqXHR, idx){
					try {
						if (jqXHR.readyState < 4) {     // hmm...
							jqXHR.abort();
							delete cache[jqXHR.url];
						}
					} catch (err) {
					}
				});
				currentRequests = [];
				return true;
			}
		}());
		return out;

	}
	service.$inject = ["$rootScope", "$timeout", "ibxHandleError", "ibxConfig"];
	app.factory("Request", service);
});
