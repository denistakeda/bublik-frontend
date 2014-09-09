describe('<%= "glx"+_.capitalize(name) %>', function () {

    beforeEach(module('<%= appname %>'));
    beforeEach(module('html.templates'));

    var scope, element;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<<%= "glx-"+_.dasherize(name) %>></<%= "glx-"+_.dasherize(name) %>>');
        $compile(element)(scope);
        scope.$digest();
    }));

    it('should ...', function () {

        /*
         expect(element.text()).toBe('hello, world');
         */

    });
});