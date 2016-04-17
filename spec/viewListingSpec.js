/**
 * Created by johnfranklin on 4/16/16.
 */
/**
 * Created by johnfranklin on 4/16/16.
 */
describe("viewListing", function(){
    var scope, state, stateparams, oldScope, httpBackend, controller, q, uibModalInstance = {};
    uibModalInstance.close = new function(){};
    uibModalInstance.dismiss = new function(){};

    beforeEach(module("MyApp"))
    beforeEach(function () {
        var store = {};

        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            return store[key] = value + '';
        });
        spyOn(localStorage, 'clear').and.callFake(function () {
            store = {};
        });
        spyOn(uibModalInstance, 'close')
        spyOn(uibModalInstance, 'dismiss')
        spyOn(window, 'alert');
    });
    beforeEach(inject(function($rootScope, $state, $stateParams, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        //console.log(httpBackend)
        scope = $rootScope.$new();
        oldScope = $rootScope.$new();
        //console.log(scope)
        state = $state
        stateparams = $stateParams
        $stateParams._id = '5043'
        spyOn(state, "go");
        controller = $controller('viewListing', {
            '$stateParams': stateparams,
            '$state': state,
            '$scope': scope,
            'oldScope': oldScope,
            '$uibModalInstance': uibModalInstance,

        });
        q = [{"_id":"56e88516217a5c6b0c35c5d6","name":"Santa Clara University","createdAt":"2016-03-15T21:56:38.961Z","__v":0},{"_id":"56e8853a217a5c6b0c35c5d7","name":"San Jose State University","createdAt":"2016-03-15T21:57:14.020Z","__v":0}];
        httpBackend.whenGET("api/Ad").respond(q)
        httpBackend.whenGET("api/Feedback").respond(q)

        httpBackend.whenGET('components/LandingPage/NewLandingPage.ejs')
            .respond({response:"??? why does this happen?"});
    }));
    it("pulls Feedback and the Ad", function(){
        httpBackend.flush()
        expect(scope.universities).toEqual([{ text: 'Santa Clara University', value: '56e88516217a5c6b0c35c5d6' }, { text: 'San Jose State University', value: '56e8853a217a5c6b0c35c5d7' }]);
    })
    it("Averages the review scores", function(){

    })

})