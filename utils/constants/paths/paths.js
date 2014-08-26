angular.module('glxBublik').controller('ClearStorageCtrl', function(){

});

angular.module('glxBublik').constant('glxPaths', {
    defaultRouting: {
        path: "/top"
    },
    allRouting: {
        userRegistration: {
            path: "/registration",
            template: "<div class='glx-user-registration'></div>",
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
            controller: "ClearStorageCtrl"
        },
        userFollowers: {
            path: "/user/:userId/followers",
            template: "<glx-user-followers></glx-user-followers>",
            controller: "ClearStorageCtrl"
        }
    }
});
