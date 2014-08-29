angular.module('glxPages').directive('glxCompanyRegistration', function (glxConfig) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pages/companyRegistration/companyRegistration.html',
        link: function (scope, elm, attrs, fn) {
            scope.company = {
                title: '',
                slogan: '',
                hidden: true
            };
        }
    };
});
