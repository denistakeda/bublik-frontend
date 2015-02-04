angular.module('glxPages').directive('glxRegistration', function (glxCurrentUserEntity) {
    return {
        restrict: 'E',
        scope: {

        },
        templateUrl: 'pages/registration/registration.html',
        link: function (scope, element, attrs, fn) {
            scope.registration = function () {
                scope.loading = true;

                glxCurrentUserEntity.registration({},
                    {
                        login: scope.email,
                        password: scope.password,
                        first_name: scope.firstName,
                        last_name: scope.lastName
                    });
            };

            scope.fieldClass = function (dirty, valid) {
                if (!dirty) return '';
                if (valid) {
                    return 'has-success';
                } else {
                    return 'has-error';
                }
            };

        }
    };
});
