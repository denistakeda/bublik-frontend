describe('glxCreateCompanyPage', function () {


    beforeEach(module('glxPages', function ($provide) {
        var mockCompanyEntity = {createCompany: function (param, body, onSuccess) {
                onSuccess({id: companyId}) ;
            }
        };
        $provide.value('glxCompanyEntity', mockCompanyEntity);
    }));

    var scope, element;
    var companyId = 100500;
    var companyName = 'New Company';

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        element = angular.element('<glx-create-company-page></glx-create-company-page>');
        $compile(element)(scope);
        scope.$digest();
    }));

    it('company label required', inject(function ($location) {
        expect(element.find('.company-create-button').attr('disabled')).toBe('disabled');
        element.find('input.company-title').text(companyName);
        //element.find('.company-create-button').click();


         //expect($location.url()).toBe('company/'+companyId);
    }));
});