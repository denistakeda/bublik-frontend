angular.module('glxUtils').factory('glxApplicationReady', function ($rootScope) {

    var _serviceReady = {};

    var _pub = {
        waitResource: function(res){
            _serviceReady[res] = false;
        },
        resourceReady: function(res){
            _serviceReady[res] = true;
        },
        isResourceReady: function(res){
            return _serviceReady[res];
        }
    };

    var glxApplicationReady = angular.extend({}, _pub);

    return glxApplicationReady;
});