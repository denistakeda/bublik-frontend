describe('userInfoPageCtrl', function () {

    beforeEach(module('glxPages'));

    var ctrl;
    beforeEach(inject(function ($controller) {
        ctrl = $controller('glxUserInfoPageCtrl', {
            glxUserEntity: {
                getUserInfo: function () {}
            }
        });
    }));

    it('should ...', inject(function () {

    }));

});
