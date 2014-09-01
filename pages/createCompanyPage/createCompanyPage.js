angular.module('glxPages').directive('glxCreateCompanyPage', function (glxCompanyEntity, glxLocationHelper) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pages/createCompanyPage/createCompanyPage.html',
        link: function (scope, elm, attrs, fn) {
            scope.company = {};
            scope.createCompany = function(){
                glxCompanyEntity.createCompany({}, scope.company, function(data){
                    glxLocationHelper.redirectTo('company/'+data.id);
                });
            };
        }
    };
});
