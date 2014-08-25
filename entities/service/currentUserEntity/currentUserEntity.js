angular.module('glxEntities').factory('glxCurrentUserEntity', function ($resource, $cookies, $location, glxTransformResponseCollection) {

    var _pupFields = {
        currentUser: {}
    };

    var _currentUserResource = $resource('/api/user/current/info', {},
        {'getCurrentUser': {
            method: 'GET',
            transformResponse: [
                glxTransformResponseCollection.fromJsonConverter,
                glxTransformResponseCollection.extractData,
                function (data, headers) {
                    angular.extend(_pupFields.currentUser, data);
                    return data;
                }
            ]
        }});

    var _loginResource = $resource('/api/user/login', {},
        {
            'login': {
                method: 'PUT',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    function (data, headers) {
                        if (/200*/.test(headers('Status'))) {
                            $cookies['ACCESS_TOKEN'] = data.access_token;
                            _currentUserResource.getCurrentUser();
                            $location.path('/user/' + data.id);//TODO try to see the way without path hardcode
                        }
                        return data;
                    }
                ]
            }
        });

    var _logoutResource = $resource('/api/user/logout', {},
        {
            'logout': {
                method: 'PUT',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    function (data, headers) {
                        if (/200*/.test(headers('Status'))) {
                            delete $cookies["ACCESS_TOKEN"];
                            _currentUserResource.getCurrentUser();
                            $location.path('/login');//TODO try to see the way without path hardcode
                        }
                        return data;
                    }
                ]
            }
        });

    var glxCurrenUserEntity = angular.extend({}, _pupFields, _currentUserResource, _loginResource, _logoutResource);

    return glxCurrenUserEntity;
});