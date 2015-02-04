describe('<%= "glx"+_.capitalize(name) %>', function () {

    beforeEach(module('<%= appname %>'));

    var scope, element;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('insert your html here');
        $compile(element)(scope);
        scope.$digest();
    }));

    it('should ...', function () {

        /*
         To test your directive, you need to create some html that would use your directive,
         send that through compile() then compare the results.

         var element = compile('<div mydirective name="name">hi</div>')(scope);
         expect(element.text()).toBe('hello, world');
         */

    });
});