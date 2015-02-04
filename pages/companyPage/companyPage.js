angular.module('glxPages').directive('glxCompanyPage', function (glxCompanyEntity, glxConfig) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'pages/companyPage/companyPage.html',
        link: function (scope, elm, attrs, fn) {
            scope.storage = glxCompanyEntity.storage;

            scope.getAvatar = function () {
                return glxCompanyEntity.storage.company.logotype && glxCompanyEntity.storage.company.logotype.preview_url ||
                    glxConfig.defaultAvatar;
            };

            scope.setCompanyTitle = function (title) {
                glxCompanyEntity.setFields({companyId: glxCompanyEntity.storage.company.id}, {title: glxCompanyEntity.storage.company.title});
            };
        }
    };
});
