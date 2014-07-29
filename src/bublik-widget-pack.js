
if (JSON && JSON.stringify && window.Prototype) {
	var _stringify = JSON.stringify;

	JSON.stringify = function(value){
		var proto_arry_toJson = Array.prototype.toJSON;
		delete Array.prototype.toJSON;
		var toRet = _stringify(value);
		Array.prototype.toJSON = proto_arry_toJson;
		return toRet;
	}
}

define('bublikApp', ["components/apps/app"], function () {
	return require("components/apps/app");
})


define([
	'angular',
	'jquery',
	//'components/languageLoader',
	'components/apps/bublik/bublik',
	'css!components/apps/bublik/bublik.css',
	//'components/services/config'
	//'components/languageLoader',
	//'components/services/config',
	'glx',  // load module to prevent loading in production
	'glx-utils'
	//'text', // load module to prevent loading in production
	//'components/templates',
	//'components/apps/unisearch/unisearch',
	//'components/apps/incanvas/incanvas',
	//'angular-touch',
	// other widgets which doesn't used in unisearch application
	//'ibx!searchbar-short'

], function(angular, $, loadLanguage/*,config*/){
	return function(opt, cb){
        cb&&cb();
		//loadLanguage(cb);
		//config(opt||{});
		/*loadLanguage(cb || angular.mock,
			function (data, status, headers, config) {  // error handler

				if (status == 403 && data.redirect) {
					$('.mainloader div').html("Checking user permissions...");

					var newDialog = $("<div>").css({'visibility': 'hidden', 'overflow': 'hidden'}).appendTo("body");
					newDialog.html(
						$("<iframe></iframe>", { width: "350", height: "310", src: data.redirect, frameborder: 0 })
							.load(function () {
								setTimeout(function () {
									newDialog.css({'visibility': 'visible', 'overflow': 'hidden'}).dialog({
										closeOnEscape: false,
										width: 385,
										dialogClass: 'no-close',
										height: 375,
										resizable: false,
										draggable: false
									})
								}, 5000);
							})
					);
				} else {
					$('.mainloader div')    // loader
						.addClass("alert alert-danger")
						.css('background-color', '#f2dede')
						.html("Service is unavailable. Please try again later.");
				}
			});*/
		return ['Application'/*,"ngTouch"*/];
	}
});

