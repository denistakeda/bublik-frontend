angular.module('glxBublik', ['ui.bootstrap', 'ui.utils', 'ngRoute', 'glxPages', 'glxUtils', 'glxEntities', 'glxWidgets']);

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
