/**
 * Default routing controller
 */
angular.module('glxUtils').controller('ClearStorageCtrl', function(glxApplicationReady){
    glxApplicationReady.resourceReady('mainContent');
});

angular.module('glxUtils').constant('glxPaths', {
    defaultRouting: {
        path: "/"
    },
    allRouting: {
        userRegistration: {
            path: "/registration",
            template: "<glx-registration></glx-registration>",
            controller: "ClearStorageCtrl"
        },
        userLogin: {
            path: "/login",
            template: "<glx-login></glx-login>",
            controller: "ClearStorageCtrl"
        },
        userInfo: {
            path: "/user/:userId",
            template: "<glx-user-info-page></glx-user-info-page>",
            controller: 'glxUserInfoPageCtrl'
        },
        userFollowers: {
            path: "/user/:userId/followers",
            template: "<glx-user-followers></glx-user-followers>",
            controller: "ClearStorageCtrl"
        },
        userFollowed: {
            path: "/user/:userId/followed",
            template: "<glx-user-followed></glx-user-followed>",
            controller: "ClearStorageCtrl"
        }
    }
});
