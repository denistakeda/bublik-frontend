angular.module('glxEntities').factory('glxCompanyEntity', function ($resource, glxEntity, glxTransformResponseCollection, glxPathKeeper, glxMessager) {
    return glxEntity({
        storage: {
            company: {type: 'Object', cleanEvent: '$locationChangeStart'}
        },
        privateResources: function (storage) {
            angular.extend(this,
                $resource('/api/company/:companyId', {companyId: '@companyId'},
                    {
                        'setFields': {
                            method: 'POST'
                        }
                    }
                ));
        },
        controller: function (storage, privateResources) {
            var _privateResources = {};

            angular.extend(this,
                $resource('/api/company/new', {},
                    {
                        'createCompany': {
                            method: 'PUT',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData,
                                glxTransformResponseCollection.onSuccessTransform(function (data) {
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
                                function (data) {
                                    angular.extend(storage.company, data);
                                    return data;
                                }
                            ]
                        }
                    }
                ));

            this.setFields = function (parameters, fields, onSuccess, onError) {
                return privateResources.setFields(parameters, fields, function () {
                    angular.extend(storage.company, fields);
                    if (onSuccess)
                        onSuccess(arguments);
                }, function(){
                    glxMessager.showErrorAlert('widget.userInfo.backenderror');
                    if (onError)
                        onError(arguments);
                });
            };

        }
    });

});