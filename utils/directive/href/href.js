angular.module('glxUtils').directive('glxHref', function (glxPaths, glxPathKeeper) {
    return {
        restrict: 'A',
        scope: {
            glxHref: '@glxHref',
            glxHrefParams: '=glxHrefParams'
        },
        link: function (scope, element, attrs, fn) {
            var changeHref = function(){
                element.attr('href', glxPathKeeper.getHref(scope.glxHref, scope.glxHrefParams));
            };
            scope.$watchGroup(['glxHref','glxHrefParams'], function(newVal, oldVal){
                if (newVal===oldVal) return;
                changeHref();
            });
            changeHref();
        }
    };
});