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
			elm = angular.element('<div class="glx-tags" glx-model="tagsArray" allow-control="true">');
			scope = $rootScope.$new();
			scope.tagsArray = tagsArray;
			$compile(elm)(scope);
			scope.$digest();
		}));

		it('tags count should be as the glxModel length', function(){
			expect(elm.find('.glx-tag').size()).toBe(tagsArray.length);
		});

		it('should display control button only if allowControl is true', function(){
			//console.log(elm.find('.remove-tag-button'));
			scope.allowControl = true;
			//console.log(elm.find('.remove-tag-button').size());
			expect(elm.find('.remove-tag-button').size()).toBe(tagsArray.length);
			scope.allowControl = false;
			scope.$digest();
			expect(elm.find('.remove-tag-button').size()).toBe(0);
		});

	});
});

