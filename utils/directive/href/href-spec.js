describe('glxHref', function () {

    beforeEach(module('glxUtils', function($provide){
        var mockPaths = {
            allRouting: {
                mockRouting: {path: '/mockRouting/:param1?param2=:param2'},
                mockRouting2: {path: '/mockRouting2/:param1?param2=:param2'},
            }
        };
        $provide.value('glxPaths', mockPaths);
    }));

    var scope, element;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.path = 'mockRouting';
        scope.params = {param1:123, param2: 'abc'};
        element = angular.element('<a glx-href="{{path}}" glx-href-params="params"></a>');
        $compile(element)(scope);
        scope.$digest();
    }));

    it('glxHrev should get path from the glxPath service', function () {
        expect(element.attr('href')).toEqual('#/mockRouting/123?param2=abc');
    });

    it('directive should change href attr when change glx-href or glx-href-params attrs', function(){
        expect(element.attr('href')).toEqual('#/mockRouting/123?param2=abc');
        scope.path = 'mockRouting2';
        scope.params = {param1:456, param2: 'def'};
        scope.$digest();
        expect(element.attr('href')).toEqual('#/mockRouting2/456?param2=def');
    });
});