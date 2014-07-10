define([
	'angular',
	'angularMocks',
	'ibxApp',
	'/base/src/js/filters/highlight.js'
], function(angular, mocks, app) {
	'use strict';

	describe('filter', function() {

		beforeEach(mocks.module('Application'));
		/*
		describe('ibxHighlight', function() {
			describe('should not highlight string', function(){
				it("which ends with additional char", function(){
					runs(function(){mocks.inject(function(ibxHighlightFilter, RestAPI) {
						RestAPI.getMetaData().queryString = [{
							toString : function(){ return 'tube' }
						}];
						expect(ibxHighlightFilter("fractional tubes")).toBe("fractional tubes");
					})});
				});
				it("which ends with additional number", function(){
					runs(function(){mocks.inject(function(ibxHighlightFilter, RestAPI) {
						RestAPI.getMetaData().queryString = [{
							toString : function(){ return 'tube' }
						}];
						expect(ibxHighlightFilter("fractional tube1")).toBe("fractional tube1");
					})});
				});
				it("which does not content token", function(){
					runs(function(){mocks.inject(function(ibxHighlightFilter, RestAPI) {
						RestAPI.getMetaData().queryString = [{
							toString : function(){ return 'tube' }
						}];
						expect(ibxHighlightFilter("fractional")).toBe("fractional");
					})});
				});
			});
			it('should highlight word', function(){
				mocks.inject(function(ibxHighlightFilter, RestAPI) {
					RestAPI.getMetaData().queryString = [{
						toString : function(){ return 'tube' }
					}];
					expect(ibxHighlightFilter("fractional tube")).toBe("fractional <span class='highlight'>tube</span>");
					expect(ibxHighlightFilter("fractionaltube")).toBe("fractional<span class='highlight'>tube</span>");
					expect(ibxHighlightFilter("fractional tube s")).toBe("fractional <span class='highlight'>tube</span> s");
				});
			});
			it('cache value: change token without revisionId', function(){
				mocks.inject(function(ibxHighlightFilter, RestAPI) {
					RestAPI.getRevisionId = function(){ return "oneRevision"}
					RestAPI.getMetaData().queryString = [{
						toString : function(){ return 'tube' }
					}];
					expect(ibxHighlightFilter("fractional tube")).toBe("fractional <span class='highlight'>tube</span>");
					RestAPI.getMetaData().queryString = [{
						toString : function(){ return 'otherToken' }
					}];
					expect(ibxHighlightFilter("fractional tube")).toBe("fractional <span class='highlight'>tube</span>");
				});
			});
			it('highlight with asterisk', function(){
				mocks.inject(function(ibxHighlightFilter, RestAPI) {
					RestAPI.getMetaData().queryString = [{
						toString : function(){ return 'tube*' }
					}];
					expect(ibxHighlightFilter("fractional tube")).toBe("fractional <span class='highlight'>tube</span>");
					expect(ibxHighlightFilter("fractional tubes")).toBe("fractional <span class='highlight'>tubes</span>");
					expect(ibxHighlightFilter("fractionaltube")).toBe("fractional<span class='highlight'>tube</span>");
					expect(ibxHighlightFilter("fractionaltubes")).toBe("fractional<span class='highlight'>tubes</span>");
				});
			});
		});
		*/
	});
});