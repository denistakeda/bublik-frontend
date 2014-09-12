angular.module('glxEntityCore').factory('glxStorage', function ($rootScope) {

    var defaultConfig = {
        type: 'Object'
    };

    var createStorage = function(config){
            if (config.type==='Object'){
                return {};
            } else if(config.type==='Array'){
                return [];
            } else {
                throw new Error('Incorrect type of storage: "'+config.type+'". Supported types: "Object" and "Array"');
            }
    };

    var subscribeToCleaning = function(storage, storageName, storageConfig){
        var subscribe = function(event){
            $rootScope.$on(event, function(){
                storage[storageName] = createStorage(storageConfig);
            });
        };
        if (angular.isArray(storageConfig.cleanEvent)){
            angular.forEach(storageConfig.cleanEvent, function(event){
                subscribe(event);
            });
        } else {
            subscribe(storageConfig.cleanEvent);
        }
    };

    var glxStorage = {
        create: function(configs){
            var storage = {};
            angular.forEach(configs, function(storageConfig, storageName){
                storageConfig.prototype =  defaultConfig;
                storage[storageName] = createStorage(storageConfig);
                subscribeToCleaning(storage, storageName, storageConfig);
            });

            return storage;
        }
    };

    return glxStorage;
});