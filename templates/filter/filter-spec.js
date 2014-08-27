describe('<%= "glx"+_.capitalize(name) %>', function() {

	beforeEach(module('<%= appname %>'));

	it('should ...', inject(function($filter) {

        var filter = $filter('<%= _.camelize(name) %>');

		expect(filter('input')).toEqual('output');

	}));

});