describe('glxCompanyEntity', function () {

    var companyId = 100500;
    var httpBackend;

    beforeEach(module('glxEntities', function ($provide) {
        $provide.factory('glxMessager', function () {
            return {showErrorAlert: function () {}};
        });
    }));
    beforeEach(inject(function ($httpBackend) {
        httpBackend = $httpBackend;
    }));

    it('createCompany function should return companyId', inject(function (glxCompanyEntity) {
        httpBackend.when('PUT', '/api/company/new').respond({data: {id: companyId}});
        var resultId;
        glxCompanyEntity.createCompany({}, {title: "Company Name"}, function (data) {
            resultId = data.id;
        });
        httpBackend.flush();
        expect(companyId).toBe(resultId);

    }));

    it('should get company info', inject(function (glxCompanyEntity) {
        var mockCompany = {id: 1, title: 'Some Company'};
        httpBackend.when('GET', '/api/company/1').respond({data: mockCompany});
        glxCompanyEntity.getCompany({companyId: 1});
        httpBackend.flush();
        expect(glxCompanyEntity.storage.company).toEqual(mockCompany);
    }));

    it('should change company fields', inject(function (glxCompanyEntity) {
        var mockFields = {title: 'New Comany Title', slogan: 'The best for a west'};
        httpBackend.when('POST', '/api/company/1').respond({data: 'SUCCESS'});
        glxCompanyEntity.setFields({companyId: 1}, mockFields);
        httpBackend.flush();
        expect(glxCompanyEntity.storage.company.title).toEqual(mockFields.title);
        expect(glxCompanyEntity.storage.company.slogan).toEqual(mockFields.slogan);
    }));

});