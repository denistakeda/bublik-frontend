angular.module('<%= appname %>').directive('<%= "glx"+_.capitalize(name) %>', function () {
    return {
        restrict: 'E',
        scope: {

        },
        templateUrl: '<%= htmlPath %>',
        link: function (scope, elm, attrs, fn) {


        }
    };
});
