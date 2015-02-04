describe('glxPathKeeper', function () {

    var currentLocation = '';

    beforeEach(module('glxUtils', function ($provide) {
        $provide.constant('glxPaths', {
            allRouting: {
                mockRouting1: {
                    path: '/mockPath'
                },
                mockRoutingWithParameters: {
                    path: '/mockPath/:param1?param2=:param2'
                }
            }
        });
        $provide.value('$location', {
            path: function(url){
                currentLocation = url;
            }
        });

    }));
    angular.module('glxBublik').constant('glxPaths', {
        allRouting: {
            mockRouting1: {
                path: '/mockPath'
            },
            mockRoutingWithParameters: {
                path: '/mockPath/:param1?param2=:param2'
            }
        }
    });

    it('should give href', inject(function (glxPathKeeper) {
        expect(glxPathKeeper.getHref('mockRouting1')).toEqual('#/mockPath');
        expect(glxPathKeeper.getHref('mockRoutingWithParameters', {param1: 'abc', param2: 123})).toEqual('#/mockPath/abc?param2=123');
    }));

    it('shoud redirect to correct path', inject(function(glxPathKeeper){
        glxPathKeeper.goToPath('mockRouting1');
        expect(currentLocation).toBe('/mockPath');
        glxPathKeeper.goToPath('mockRoutingWithParameters', {param1: 'abc', param2: 123});
        expect(currentLocation).toBe('/mockPath/abc?param2=123');
    }));

});