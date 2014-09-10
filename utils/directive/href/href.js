angular.module('glxUtils').directive('glxHref', function (glxPaths) {
    return {
        restrict: 'A',
        scope: {
            glxHref: '@glxHref',
            glxHrefParams: '=glxHrefParams'
        },
        link: function (scope, element, attrs, fn) {
            var changeHref = function(){
                var resultHref = glxPaths.allRouting[scope.glxHref].path;
                angular.forEach(scope.glxHrefParams, function (v, k) {
                    resultHref = resultHref.replace(':' + k, v);
                });
                element.attr('href', '#' + resultHref);
            };
            scope.$watchGroup(['glxHref','glxHrefParams'], function(newVal, oldVal){
                if (newVal===oldVal) return;
                changeHref();
            });
            changeHref();
        }
    };
});