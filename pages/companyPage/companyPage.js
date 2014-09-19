angular.module('glxPages').directive('glxCompanyPage', function (glxCompanyEntity) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pages/companyPage/companyPage.html',
        link: function (scope, elm, attrs, fn) {
            scope.storage = glxCompanyEntity.storage;
        }
    };
});
