angular.module('glxEntityCore').factory('glxEntity', function (glxStorage) {


    var glxEntity = function(config){
        var storage = glxStorage.create(config.storage);
        var entity = new config.controller(storage);
        entity.storage = storage;
        return entity;
    };

    return glxEntity;
});