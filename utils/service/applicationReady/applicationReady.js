angular.module('glxUtils').factory('glxApplicationReady', function ($rootScope, glxDictionary) {

    var _servicesReady = {
        isLocalizationLoaded: function(){
            return glxDictionary!={};
        },
        isBackendDataLoaded: function(){
            return true; //TODO add logic here
        }
    };

    var _applicationReady = {
        isApplicationReady: function(){
            return _servicesReady.isLocalizationLoaded() && _servicesReady.isBackendDataLoaded();
        }
    };

    $rootScope.isApplicationReady = _applicationReady.isApplicationReady;
    $rootScope.isLocalizationLoaded = _servicesReady.isLocalizationLoaded;
    $rootScope.isBackendDataLoaded = _servicesReady.isBackendDataLoaded;

    var glxApplicationReady = angular.extend({}, _servicesReady, _applicationReady);

    return glxApplicationReady;
});