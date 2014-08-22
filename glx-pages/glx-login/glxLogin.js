angular.module('glxPages').directive('glxLogin',
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'glx-pages/glx-login/glxLogin.html',
            link: function (scope, elm, attrs) {
                scope.login = function () {
                    scope.waitResponse = true;
                    userBackend.login({login: scope.email, password: scope.password, remember_me: scope.rememberMe}, function (response) {
                        scope.waitResponse = false;
                        userBackend.getMenu();
                        commonBackend.redirectTo("/user/" + response.id);
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

                commonBackend.alreadyLoaded();
            }
        };
    });
