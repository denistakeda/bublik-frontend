angular.module('glxEntities').factory('glxCompanyEntity', function ($resource, glxEntity, glxTransformResponseCollection, glxPathKeeper) {
    return glxEntity({
        storage: {},
        controller: function (storage) {
            angular.extend(this,
                $resource('/api/company/new', {},
                    {
                        'createCompany': {
                            method: 'PUT',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData,
                                glxTransformResponseCollection.onSuccessTransform(function(data){
                                    glxPathKeeper.goToPath('companyPage', {companyId: data.id});
                                    return data;
                                })
                            ]
                        }
                    }));
        }
    });

});