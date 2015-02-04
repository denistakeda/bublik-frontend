angular.module('glxWidgets').directive('glxSocialItem', function (glxConfig) {
    return {
        restrict: 'E',
        require: '^glxFollowList',
        scope: {
            glxSocialPreview: '=glxSocialPreview'
        },
        templateUrl: 'widgets/followList/socialItem/socialItem.html',
        link: function (scope, element, attrs, listCtrl) {
            listCtrl.addItem();

            scope.getPreviewImage = function(){
                return scope.glxSocialPreview.preview_url || glxConfig.defaultAvatar;
            };
        }
    };
});
