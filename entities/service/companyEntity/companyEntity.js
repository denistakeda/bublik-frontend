angular.module('glxEntities').factory('glxCompanyEntity', function ($resource, glxEntity, glxTransformResponseCollection, glxPathKeeper) {
    return glxEntity({
        storage: {
            company: {type: 'Object', cleanEvent: '$locationChangeStart'}
        },
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

            angular.extend(this,
                $resource('/api/company/:companyId', {companyId: '@companyId'},
                    {
                        'getCompany': {
                            method: 'GET',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData,
                                function(data){
                                    angular.extend(storage.company, data);
                                    return data;
                                }
                            ]
                        }
                    }
            ));
        }
    });

});