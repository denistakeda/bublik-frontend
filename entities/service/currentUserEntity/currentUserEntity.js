angular.module('glxEntities').factory('glxCurrentUserEntity', function ($resource, $q, $cookies, $location, glxTransformResponseCollection, glxApplicationReady) {

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
                    glxApplicationReady.resourceReady('currentUser');
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
                    glxTransformResponseCollection.onSuccessTransform(function(data){
                        $cookies['ACCESS_TOKEN'] = data.access_token;
                        _currentUserResource.getCurrentUser();
                        $location.path('/user/' + data.id);
                        return data;
                    })
                ]
            }
        });
    var _registrationResource = $resource('/api/user/new', {},
        {
            'registration': {
                method: 'PUT',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    glxTransformResponseCollection.onSuccessTransform(function(data){
                        $cookies['ACCESS_TOKEN'] = data.access_token;
                        _currentUserResource.getCurrentUser();
                        $location.path('/user/' + data.id);
                        return data;
                    })
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
    var _loginUniqueResource = $resource('/api/user/login/check/:login', {login: '@login'},
        {
           'checkLogin': {
               method: 'GET'
           }
        });

    var glxCurrenUserEntity = angular.extend({}, _pupFields, _currentUserResource, _loginResource, _logoutResource
        , _registrationResource, _loginUniqueResource);

    return glxCurrenUserEntity;
});