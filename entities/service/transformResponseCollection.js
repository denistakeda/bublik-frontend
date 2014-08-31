angular.module('glxEntities').factory('glxTransformResponseCollection', function () {

    var glxTransformResponseCollection = {
        fromJsonConverter: function (data) {
            try{
                return angular.fromJson(data);
            } catch(e){
                return data;
            }

        },
        extractData: function (data) {
            if (data.data) return data.data;
            return data;
        },
        onSuccessTransform: function(cb){
            return function(data, headers){
                if (cb && /[(201*)(200*)]/.test(headers('Status'))){
                    return cb(data, headers);
                } else {
                    return data;
                }
            };
        },
        clearEntity: function(entity){
            return glxTransformResponseCollection.onSuccessTransform(function(data){
                // TODO: impove this pull shit
                angular.forEach(entity, function(v, k){
                    delete entity[k];
                })
                return data;
            });
        }
    };

    return glxTransformResponseCollection;
});