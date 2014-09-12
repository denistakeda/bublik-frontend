describe('glxEntity', function () {

    beforeEach(module('glxEntityCore'));

    it('controller executing', inject(function (glxEntity) {
        var successFlag = false;
        var entity = glxEntity({
            storage: {},
            controller: function () {
                successFlag = true;
            }
        });
        waitsFor(function () {
            return successFlag;
        }, 'controller executed', 500);
    }));

    it('controller have storage link', inject(function (glxEntity) {
        var successFlag = false;
        var entity = glxEntity({
            storage: {storage1: {type: 'Object'}},
            controller: function (storage) {
                successFlag = !angular.isUndefined(storage.storage1);
            }
        });
        waitsFor(function () {
            return successFlag;
        }, 'controller executed', 500);
    }));

    it('should throw exception when incorrect type of storage', inject(function(glxEntity){
        var createEntity = function(){
            glxEntity({
                storage: {type: 'IncorrectType'},
                controller: function () {
                }
            });
        };
        expect(createEntity).toThrow();
    }));

    describe('glxEntity creating correct object', function () {
        var entity;
        beforeEach(inject(function (glxEntity) {
            entity = glxEntity({
                storage: {storage1: {type: 'Object', cleanEvent: 'cleanEvent'}},
                controller: function (storage) {
                    this.abc = 'abc';
                    this.doSmth = function () {
                    };
                    storage.storage1.abc = 'abc';
                }
            });
        }));

        it('entity object should contains storage link', function () {
            expect(entity.storage).toBeDefined();
        });

        it('user can change storage from controller', function () {
            expect(entity.storage.storage1.abc).toBe('abc');
        });

        it('all fields from controller accessible in entity object', function () {
            expect(entity.abc).toBe('abc');
        });

        it('all functions from controller accessible in entity object', function () {
            expect(entity.doSmth).toBeDefined();
            expect(angular.isFunction(entity.doSmth)).toBe(true);
        });

        it('cleaning storage after clean event', inject(function ($rootScope) {
            $rootScope.$emit('cleanEvent');
            expect(entity.storage).toEqual({storage1: {}});
        }));
    });

});