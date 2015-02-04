angular.module('glxPages').directive('glxEnsureUnique', function (glxCurrentUserEntity) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue){
                glxCurrentUserEntity.checkLogin({login: viewValue}, function(data){
                    if (data.status && data.status === "ok"){
                        ctrl.$setValidity('unique', true);
                    } else {
                        ctrl.$setValidity('unique', false);

                    }
                });
                return viewValue;
            });

        }
    };
});