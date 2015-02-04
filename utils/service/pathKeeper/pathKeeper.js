angular.module('glxUtils').factory('glxPathKeeper', function (glxPaths, $location) {

    var _private = {
        getPath: function (pathName, params) {
            var resultPath = glxPaths.allRouting[pathName].path;
            angular.forEach(params, function (v, k) {
                resultPath = resultPath.replace(':' + k, v);
            });
            return resultPath;
        }
    };

    var glxPathKeeper = {
        getHref: function(pathName, params){
            return '#'+_private.getPath(pathName, params);
        },
        goToPath: function(pathName, params){
            $location.path(_private.getPath(pathName, params));
        }
    };

    return glxPathKeeper;
});