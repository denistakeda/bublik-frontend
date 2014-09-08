angular.module('glxEntities').factory('glxStorageCleaner', function ($rootScope) {

    var _private = {
        storages: []
    };

    var glxStorageCleaner = {
        addLocationDependentStorage: function(){
            _private.storages = _private.storages.concat(arguments);
        },
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

    $rootScope.$on('$locationChangeStart', function(){
        angular.forEach(_private.storages, function(storage){
            glxStorageCleaner.clean(storage);
        });
    });

    return glxStorageCleaner;
});