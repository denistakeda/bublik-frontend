define([
    'ibxApp',
    'angular'
], function(app, angular){
    "use strict";

        var filter=function($parse) {
            return function(key,params) {
                var tstring= $parse(key)(angular.loadLanguage());
                if(!tstring)
                    return key;

                angular.forEach(params,function(v,k){
                    tstring = tstring.replace("{"+k+"}",v);
                })
                return tstring;
            }
        }
        filter.$inject=["$parse"];
        app.filter("ibxT", filter);
    return app;
});