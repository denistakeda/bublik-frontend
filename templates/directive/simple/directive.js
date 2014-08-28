angular.module('<%= appname %>').directive('<%= "glx"+_.capitalize(name) %>', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, fn) {

        }
    };
});