angular.module('glxEntities').factory('glxStorageCleaner', function () {

    var glxStorageCleaner = {
        clean: function () {
            angular.forEach(arguments, function (obj) {
                if (angular.isArray(obj)) {
                    obj.length = 0;
                } else if (angular.isObject(obj)) {
                    angular.forEach(obj, function (v, k) {
                        delete obj[k];
                    });
                }
            });
        }
    };

    return glxStorageCleaner;
});