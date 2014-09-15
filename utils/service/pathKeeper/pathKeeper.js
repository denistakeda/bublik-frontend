angular.module('glxUtils').factory('glxPathKeeper', function (glxPaths) {

    var _private = {
        getPath: function (pathName, parameters) {
            console.log(glxPaths);
            var resultPath = glxPaths.allRouting[pathName].path;
            angular.forEach(parameters, function (v, k) {
                resultPath = resultPath.replace(':' + k, v);
            });
            return resultPath;
        }
    };

    var glxPathKeeper = {
        getHref: function(pathName){
            return '#'+_private.getPath(pathName);
        }
    };

    return glxPathKeeper;
});