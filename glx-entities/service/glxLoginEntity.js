angular.module('glxEntities').factory('glxLoginEntity',function($resource, $cookies, $location, glxTransformResponseCollection) {
	var glxLogin = $resource('/api/user/login', {},
        {
            'login': {
                method: 'PUT',
                transformResponse: [
                    glxTransformResponseCollection.fromJsonConverter,
                    glxTransformResponseCollection.extractData,
                    function(data, headers){
                        console.log(headers('Status'));
                        if (/200*/.test(headers('Status'))){
                            $cookies['ACCESS_TOKEN'] = data.accessToken;
                            $location.path('/api/user/'+data.id);//TODO try to see thw way without path hardcode
                        }
                        return data;
                    }
                ]
            }
        });

	return glxLogin;
});