describe('glxStorage', function () {

    beforeEach(module('glxEntityCore'));

    xit('should create storage object', inject(function (glxStorage) {
        expect(glxStorage.create({
                storage1: {type: 'Object'}
            })
        ).toEqual({storage1: {}});
    }));

    xit('should create storage array', inject(function (glxStorage) {
        expect(glxStorage.create({
                storage1: {type: 'Array'}
            })
        ).toEqual({storage1: []});
    }));

    xit('should create a lot of storages', inject(function (glxStorage) {
        expect(glxStorage.create({
                storage1: {type: 'Object'},
                storage2: {type: 'Array'}
            })
        ).toEqual({storage1: {}, storage2: []});
    }));

    xit('empty config should return empty storage', inject(function (glxStorage) {
        expect(glxStorage.create({})).toEqual({});
    }));

    xit('should clean storage after emit clean event', inject(function (glxStorage, $rootScope) {
        var storage = glxStorage.create({
            storage1: {type: 'Object', cleanEvent: 'cleanEvent'},
            storage2: {type: 'Array', cleanEvent: 'cleanEvent'}
        });
        storage.storage1.someField = 'abc';
        storage.storage2.push('def');
        $rootScope.$emit('cleanEvent');
        expect(storage).toEqual({storage1: {}, storage2: []});
    }));

    it('user can subscribe by different clear event', inject(function (glxStorage, $rootScope, $timeout) {
        var storage = glxStorage.create({
            storage1: {type: 'Object', cleanEvent: ['cleanEvent1', 'cleanEvent2']},
            storage2: {type: 'Array', cleanEvent: 'cleanEvent1'}
        });
        storage.storage1.someField = 'abc';
        storage.storage2.push('def');

        runs(function(){
            $rootScope.$emit('cleanEvent2');
        });
        waitsFor(function(){
            return angular.equals(storage, {storage1: {}, storage2: ['def']});
        }, 'storage1 cleaning',500);
        runs(function(){
            $rootScope.$emit('cleanEvent1');
        });
        waitsFor(function(){
            return angular.equals(storage, {storage1: {}, storage2: []});
        },'all storages cleaning' , 500);
    }));

});