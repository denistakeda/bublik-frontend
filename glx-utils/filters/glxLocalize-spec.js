describe('localize', function() {

	beforeEach(module('glxUtils'));

	it('should ...', inject(function($filter) {

        var filter = $filter('localize');

		expect(filter('input')).toEqual('output');

	}));

});