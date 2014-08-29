angular.module('glxUtils').factory('glxApplicationReady', function ($rootScope, glxDictionary) {

    var isBackendLoaded = true;

    var _servicesReady = {
        isLocalizationLoaded: function(){
            return glxDictionary!=={};
        },
        isBackendDataLoaded: function(){
            return isBackendLoaded;
        }
    };

    var _applicationReady = {
        isApplicationReady: function(){
            return _servicesReady.isLocalizationLoaded() && _servicesReady.isBackendDataLoaded();
        }
    };

    var _control = {
        waitBackend: function(){
            isBackendLoaded = false;
        },
        backendReady: function(){
            isBackendLoaded = true;
        }
    };

    $rootScope.isApplicationReady = _applicationReady.isApplicationReady;
    $rootScope.isLocalizationLoaded = _servicesReady.isLocalizationLoaded;
    $rootScope.isBackendDataLoaded = _servicesReady.isBackendDataLoaded;

    var glxApplicationReady = angular.extend({}, _servicesReady, _applicationReady, _control);

    return glxApplicationReady;
});