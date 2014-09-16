angular.module('glxPages').directive('glxCreateCompanyPage', function (glxCompanyEntity) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pages/createCompanyPage/createCompanyPage.html',
        link: function (scope, elm, attrs, fn) {
            scope.company = {};
            scope.waitResponse = false;
            scope.createCompany = function(){
                scope.waitResponse = true;
                glxCompanyEntity.createCompany({}, scope.company, undefined, function(){
                    scope.waitResponse = false;
                });
            };
        }
    };
});
