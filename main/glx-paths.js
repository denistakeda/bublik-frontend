angular.module('glxBublik').controller('ClearStorageCtrl', function(){

});

angular.module('glxBublik').constant('glxPaths', {
    defaultRouting: {
        path: "/top"
    },
    allRouting: {
        userRegistration: {
            path: "/user/registration",
            template: "<div class='glx-user-registration'></div>",
            controller: "ClearStorageCtrl"
        },
        userLogin: {
            path: "/user/login",
            template: "<div class='glx-login'></div>",
            controller: "ClearStorageCtrl"
        },
        userInfo: {
            path: "/user/:userId",
            template: "<div class='glx-user-info'></div>",
            controller: "ClearStorageCtrl"
        }
    }
});

angular.module('glxBublik').config(function($routeProvider, glxPaths) {

    /* Add New Routes Above */
    angular.forEach(glxPaths.allRouting, function(routing){
        $routeProvider.
            when(routing.path, {
                template: routing.template,
                controller: routing.controller
            }
        );
    });

    $routeProvider.otherwise(glxPaths.defaultRouting.path, {
        template: glxPaths.defaultRouting.template,
        controller: glxPaths.defaultRouting.controller
    });

});