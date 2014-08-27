angular.module('glxUtils').factory('glxDictionary', function($http){
    var dictionary = {};
    $http({method: 'GET', url: '/api/localization'}).
        success(function(data){
            angular.extend(dictionary, data);
        });
    return dictionary;
});

angular.module('glxUtils').filter('glxLocalize', function($parse, glxDictionary) {
    return function(key, params){
        var tstring = $parse(key)(glxDictionary);
        if (!tstring)
            return key;

        angular.forEach(params, function(v, k){
            tstring = tstring.replace("{" + k + "}", v);
        });
        return tstring;
    };
});