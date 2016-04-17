/**
 * Created by johnfranklin on 4/16/16.
 */
/**
 * Created by johnfranklin on 4/16/16.
 */
describe("register", function(){
    var scope, state, oldScope, httpBackend, controller, uibModalInstance = {};
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
    });
    beforeEach(inject(function($rootScope, $state, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        //console.log(httpBackend)
        scope = $rootScope.$new();
        oldScope = $rootScope.$new();
        scope.username = "johnfranklin42@gmail.com"
        scope.password = "..."
        //console.log(scope)
        state = $state
        spyOn(state, "go");
        controller = $controller('login', {
            '$state': state,
            '$scope': scope,
            'oldScope': oldScope,
            '$uibModalInstance': uibModalInstance,

        });
    }));

    it("Logs the user in", function(){
        //console.log(state)
        scope.logIn();
        httpBackend.whenPOST('/user/login')
            .respond({data:{ _id: "56e88563217a5c6b0c35c5d9",
                firstName: 'John',
                lastName: 'Franklin',
                email: 'johnfranklin42@gmail.com',
                location: 'San Jose State University',
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NmU4ODU2MzIxN2E1YzZiMGMzNWM1ZDkiLCJ1c2VybmFtZSI6Im1hZG1vbmsxMjM0NSIsImV4cCI6MTQ2NjA5NjM4NywiaWF0IjoxNDYwOTEyMzg4fQ.LGreZe8gsbHHqzZUy1lhfk4gI8lltsxfl80QlKvinrs"}
            });

        httpBackend.whenGET('components/LandingPage/NewLandingPage.ejs')
            .respond({response:"??? why does this happen?"});
        httpBackend.flush()
        expect(localStorage.token).not.toBe(undefined)
        expect(uibModalInstance.close).toHaveBeenCalled();
        expect(state.go).toHaveBeenCalled();
    })
    it("redirects to Register", function(){
        scope.toRegister();
        expect(oldScope.toRegister).not.toBe("undefined")
        expect(uibModalInstance.dismiss).toHaveBeenCalled();
    })
    it("dismisses when x is clicked", function(){
        scope.dismiss();
        expect(uibModalInstance.dismiss).toHaveBeenCalled();
    })
})