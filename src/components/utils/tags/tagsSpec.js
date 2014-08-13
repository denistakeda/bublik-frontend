define([
	'angular',
	'angularMocks',
	'bublikApp',
	'glx-utils!tags',
	'components/templates'
], function(angular, mocks, app) {
	'use strict';

	describe('cloud-tag', function() {

		beforeEach(mocks.module('Application'));

		var elm, scope;
		var tagsArray = ["tag1", "tag2"];

		beforeEach(mocks.inject(function($rootScope, $compile) {
			elm = angular.element('<div class="glx-tags" glx-model="tagsArray">');
			scope = $rootScope.$new();
			scope.tagsArray = tagsArray;
			$compile(elm)(scope);
			scope.$digest();
		}));

		it('tags count should be as the glxModel length', function(){
			expect(elm.find('.abc').size()).toBe(tagsArray.length);
		});

		/*it('should have all the tags', function(){
			expect(elm.find('.tagitem').size()).toBe(tagCount);
		});

		it('should sort by label', function(){
			expect(elm.find('.tagitem:eq(0)').text()).toBe(tagA.label);
			expect(elm.find('.tagitem:eq(1)').text()).toBe(tagZ.label);
		});

		it('should zoom labels', function(){
			expect(elm.find('.tagitem:contains("' + tagZ.label + '")').css('font-size')).toBe('1.85em');
			expect(elm.find('.tagitem:contains("' + tagA.label + '")').css('font-size')).toBe('1em');
		});*/
	});
});

