describe('glxStorageCleaner', function() {

  beforeEach(module('glxEntities'));

    it('function clean should make object empty', inject(function(glxStorageCleaner) {
        var testObject = {abc:"def", def: 123};
        glxStorageCleaner.clean(testObject);
        expect(testObject).toEqual({});
    }));

    it('function clean should make array empty', inject(function(glxStorageCleaner) {
        var testArray = [123, 456];
        glxStorageCleaner.clean(testArray);
        expect(testArray).toEqual([]);
    }));

    it('function clean should clean different count of storage', inject(function(glxStorageCleaner) {
        var testArray = [123, 456];
        var testObject = {abc:"def", def: 123};
        glxStorageCleaner.clean(testArray, testObject);
        expect(testArray).toEqual([]);
        expect(testObject).toEqual({});
    }));

});