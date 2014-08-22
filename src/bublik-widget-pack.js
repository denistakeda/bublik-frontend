
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

define('bublikEntities', ["components/modules/entities"], function () {
	return require("components/modules/entities");
})

define('bublikApp', ["components/modules/app"], function () {
	return require("components/modules/app");
})


define([
	'angular',
	'jquery',
	'components/apps/bublik/bublik',
	'css!components/apps/bublik/bublik.css',
	'glx-utils',
	'components/templates'

], function(angular, $, loadLanguage/*,config*/){
	return function(opt, cb){
        cb&&cb();
		return ['Application'];
	}
});

