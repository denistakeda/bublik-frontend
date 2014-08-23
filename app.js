angular.module('glxBublik', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'ngAnimate', 'glxPages', 'glxUtils', 'glxEntities']);

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

angular.module('glxBublik').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        $rootScope.applicationReady = true;
        $rootScope.localizationLoading = true;
        $rootScope.isResourceLoading = function(){
            return $rootScope.loading || $rootScope.localizationLoading;
        };

        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
