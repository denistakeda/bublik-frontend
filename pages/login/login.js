angular.module('glxPages').directive('glxLogin',
    function (glxCurrentUserEntity) {
        return {
            restrict: 'E',
            scope: {

            },
            templateUrl: 'pages/login/login.html',
            link: function (scope, elm, attrs) {
                scope.login = function () {
                    scope.waitResponse = true;
                    glxCurrentUserEntity.login({login: scope.email, password: scope.password, remember_me: scope.rememberMe}, function (response) {
                        scope.waitResponse = false;
                    }, function () {
                        scope.invalidLogin = true;
                        scope.waitResponse = false;
                    })
                };

                scope.fieldClass = function (dirty, valid) {
                    if (!dirty) return '';
                    if (valid) {
                        return 'has-success';
                    } else {
                        return 'has-error';
                    }
                };

                //commonBackend.alreadyLoaded();

                //$rootScope.loading = false;
            }
        };
    });
