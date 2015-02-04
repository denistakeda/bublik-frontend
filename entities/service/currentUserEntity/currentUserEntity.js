angular.module('glxEntities').factory('glxCurrentUserEntity', function ($resource, $q, $cookies, $location, glxEntity, glxTransformResponseCollection, glxApplicationReady) {

    return glxEntity({
        storage: {
            currentUser: {type: 'Object'}
        },
        controller: function (storage) {
            var controller = this;
            angular.extend(this,
                $resource('/api/user/current/info', {},
                    {'getCurrentUser': {
                        method: 'GET',
                        transformResponse: [
                            glxTransformResponseCollection.fromJsonConverter,
                            glxTransformResponseCollection.extractData,
                            function (data, headers) {
                                angular.extend(storage.currentUser, data);
                                glxApplicationReady.resourceReady('currentUser');
                                return data;
                            }
                        ]
                    }})
            );

            angular.extend(this,
                $resource('/api/user/login', {},
                    {
                        'login': {
                            method: 'PUT',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData,
                                glxTransformResponseCollection.onSuccessTransform(function (data) {
                                    $cookies['ACCESS_TOKEN'] = data.access_token;
                                    controller.getCurrentUser();
                                    $location.path('/user/' + data.id);
                                    return data;
                                })
                            ]
                        }
                    })
            );

            angular.extend(this,
                $resource('/api/user/new', {},
                    {
                        'registration': {
                            method: 'PUT',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData,
                                glxTransformResponseCollection.onSuccessTransform(function (data) {
                                    $cookies['ACCESS_TOKEN'] = data.access_token;
                                    controller.getCurrentUser();
                                    $location.path('user/' + data.id);
                                    return data;
                                })
                            ]
                        }
                    })
            );

            angular.extend(this,
                $resource('/api/user/logout', {},
                    {
                        'logout': {
                            method: 'PUT',
                            transformResponse: [
                                glxTransformResponseCollection.fromJsonConverter,
                                glxTransformResponseCollection.extractData,
                                function (data, headers) {
                                    if (/200*/.test(headers('Status'))) {
                                        delete $cookies["ACCESS_TOKEN"];
                                        controller.getCurrentUser();
                                        $location.path('login');//TODO try to see the way without path hardcode
                                    }
                                    return data;
                                }
                            ]
                        }
                    })
            );

            angular.extend(this,
                $resource('/api/user/login/check/:login', {login: '@login'},
                    {
                        'checkLogin': {
                            method: 'GET'
                        }
                    })
            );
        }
    });
});