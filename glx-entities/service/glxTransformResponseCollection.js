angular.module('glxEntities').factory('glxTransformResponseCollection', function () {

    var glxTransformResponseCollection = function () {
        return {
            fromJsonConverter: function (data) {
                return angular.fromJson(data);
            },
            extractData: function (data) {
                return data.data;
            }
        }
    };

    return glxTransformResponseCollection;
});