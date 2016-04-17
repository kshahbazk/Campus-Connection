/**
 * Created by johnfranklin on 4/16/16.
 */
/**
 * Created by johnfranklin on 4/16/16.
 */
describe("register", function(){
    var scope, state, oldScope, httpBackend, controller, q, uibModalInstance = {};
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
    beforeEach(inject(function($rootScope, $state, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        //console.log(httpBackend)
        scope = $rootScope.$new();
        oldScope = $rootScope.$new();
        scope.password2 = "l"
        scope.user = {firstName: "5", lastName: "4", username: "3", email: "1@1.1", password: "l", location: "San Jose State University"};
        //console.log(scope)
        state = $state
        spyOn(state, "go");
        controller = $controller('Register', {
            '$state': state,
            '$scope': scope,
            'oldScope': oldScope,
            '$uibModalInstance': uibModalInstance,

        });
        q = [{"_id":"56e88516217a5c6b0c35c5d6","name":"Santa Clara University","createdAt":"2016-03-15T21:56:38.961Z","__v":0},{"_id":"56e8853a217a5c6b0c35c5d7","name":"San Jose State University","createdAt":"2016-03-15T21:57:14.020Z","__v":0}];
        httpBackend.whenGET("api/University").respond(q)
        httpBackend.whenGET('components/LandingPage/NewLandingPage.ejs')
            .respond({response:"??? why does this happen?"});
    }));
    it("pulls universities", function(){
        httpBackend.flush()
        expect(scope.universities).toEqual([{ text: 'Santa Clara University', value: '56e88516217a5c6b0c35c5d6' }, { text: 'San Jose State University', value: '56e8853a217a5c6b0c35c5d7' }]);
    })
    it("Registers the user", function(){
        //console.log(state)
        scope.createAccount();
        httpBackend.whenPOST('/user/register')
            .respond({});

        httpBackend.flush()

        expect(uibModalInstance.close).toHaveBeenCalled();
    })
    it("Handles password mismatch", function(){
        //console.log(state)
        scope.password2 = "m"

        scope.createAccount();
        expect(window.alert).toHaveBeenCalled();
    })
    it("dismisses when x is clicked", function(){
        scope.dismiss();
        expect(uibModalInstance.dismiss).toHaveBeenCalled();
    })
})