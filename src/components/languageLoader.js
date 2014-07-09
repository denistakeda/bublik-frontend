/*global define */
define(
	["require", "angular"/*, 'components/services/config', "text!components/languages/en.json"*/],
	function (require, angular, config, lang) {
		/*var voc = angular.fromJson(lang);
		angular.loadLanguage = function(s) {
			s && s(voc);
			return voc;
		};*/
		var loadLanguage = function(cb, err) {
			//require(["text!components/languages/en.json"], function(){ cb&&cb() })
			cb&&cb();
		};
		return loadLanguage;
});