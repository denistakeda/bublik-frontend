angular.module('glxPages').controller('glxUserInfoPageCtrl', function($routeParams, glxUserEntity, glxApplicationReady){
    glxApplicationReady.waitResource('mainContent');
    glxUserEntity.getUserInfo({userId: $routeParams.userId}, function() {
        glxApplicationReady.resourceReady('mainContent')
    });
});