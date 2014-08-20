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

/*		var elm, scope;
		var tagsArray = ["tag1", "tag2"];*/

		describe('Tags with controls', function() {
			var elm, scope, tagRemoved = false;
			var tagsArray = ["tag1", "tag2"];
			var removeTag = function(tag){tagRemoved = tag};

			beforeEach(mocks.inject(function($rootScope, $compile) {
				elm = angular.element('<div class="glx-tags" glx-model="tagsArray" allow-control="true" remove-tag-function="removeTag">');
				scope = $rootScope.$new();
				scope.tagsArray = tagsArray;
				scope.removeTag = removeTag;
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

			it('user can remove tag', function(){
				expect(elm.find('.glx-tag *:contains("'+tagsArray[0]+'")').size()).toBe(1);
				elm.find('.tag-text:contains("'+tagsArray[0]+'")+.remove-tag-button').click();
				expect(tagRemoved).toBe(tagsArray[0]);
			});

		});

		describe('Tags without controls', function(){
			var elm, scope;
			var tagsArray = ["tag1", "tag2"];

			beforeEach(mocks.inject(function($rootScope, $compile) {
				elm = angular.element('<div class="glx-tags" glx-model="tagsArray" allow-control="false">');
				scope = $rootScope.$new();
				scope.tagsArray = tagsArray;
				$compile(elm)(scope);
				scope.$digest();
			}));

			it('hide controls buttons if allowControl is true', function(){
				expect(elm.find('.remove-tag-button.ng-hide').size()).toBeGreaterThan(0);
				expect(elm.find('.editable.ng-hide').size()).toBeGreaterThan(0);
			});
		})
	})


});

