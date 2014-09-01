angular.module('glxEntities').factory('glxCompanyEntity', function ($resource, glxTransformResponseCollection) {

    var _createCompanyResource = $resource('/api/company/new', {},
        {
            'createCompany': {
                method: 'PUT',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData
                ]
            }
        });

    var glxCompanyEntity = angular.extend({}, _createCompanyResource);

    return glxCompanyEntity;
});