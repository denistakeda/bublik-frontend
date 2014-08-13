define([
	'angular',
	'angularMocks',
	'bublikApp',
	'glx-utils!tags',
	'components/templates'
], function(angular, mocks, app) {
	'use strict';

	describe('Tags', function(){
		beforeEach(mocks.module('Application'));

		var elm, scope;
		var tagsArray = ["tag1", "tag2"];

		describe('Tags with controls', function() {
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

			it('show controls buttons if allowControl is true', function(){
				expect(elm.find('.remove-tag-button').size()).toBe(tagsArray.length);
				expect(elm.find('.editable').size()).toBeGreaterThan(0);
			});

			it('', function(){

			});

		});

		describe('Tags without controls', function(){
			beforeEach(mocks.inject(function($rootScope, $compile) {
				elm = angular.element('<div class="glx-tags" glx-model="tagsArray" allow-control="false">');
				scope = $rootScope.$new();
				scope.tagsArray = tagsArray;
				$compile(elm)(scope);
				scope.$digest();
			}));

			it('hide controls buttons if allowControl is true', function(){
				expect(elm.find('.remove-tag-button').size()).toBe(0);
				expect(elm.find('.editable').size()).toBe(0);
			});
		})
	})


});

