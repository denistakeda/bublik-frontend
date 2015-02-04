angular.module('glxPages').directive('glxPwCheck', function () {
    return {
        require: 'ngModel',
        scope: {glxPwCheck: "="},
        link: function (scope, elm, attrs, ctrl) {
            //TODO not a best way for password check
            ctrl.$parsers.unshift(function (viewValue) {
                if (viewValue === scope.glxPwCheck) {
                    ctrl.$setValidity('pwmatch', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwmatch', false);
                    return undefined
                }
            });
        }
    };
});