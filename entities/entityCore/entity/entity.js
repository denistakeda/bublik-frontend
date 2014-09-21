angular.module('glxEntityCore').factory('glxEntity', function (glxStorage) {


    var glxEntity = function(config){
        var storage = glxStorage.create(config.storage);
        var privateResources;
        if (config.privateResources)
            privateResources = new config.privateResources(storage);
        var entity = new config.controller(storage, privateResources);
        entity.storage = storage;
        return entity;
    };

    return glxEntity;
});