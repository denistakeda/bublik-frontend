angular.module('glxPages').directive('glxUserAlerts', function (glxMessager) {
    return {
        restrict: 'E',
        scope: {
        },
        templateUrl: 'pages/userAlerts/userAlerts.html',
        link: function (scope, element, attrs, fn) {
            scope.alerts = glxMessager.alerts;
        }
    };
});
