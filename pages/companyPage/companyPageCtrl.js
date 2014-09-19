angular.module('glxPages').controller('glxCompanyPageCtrl', function($routeParams, glxCompanyEntity, glxApplicationReady){
    glxApplicationReady.waitResource('mainContent');
    glxCompanyEntity.getCompany({companyId: $routeParams.companyId}, function() {
        glxApplicationReady.resourceReady('mainContent');
    });
});