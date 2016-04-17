/**
 * Created by johnfranklin on 4/16/16.
 */
describe("logout", function(){
    var scope, state, httpBackend, controller;
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
    });
    beforeEach(inject(function($rootScope, $state, $httpBackend, $controller) {
        httpBackend = $httpBackend;
        //console.log(httpBackend)
        scope = $rootScope.$new();
        //console.log(scope)
        state = $state
        spyOn(state, "go");
        localStorage.setItem("token", "shouldn't exist")
        console.log(localStorage.token);
        controller = $controller('LogOut', {
                '$state': state,

            });
    }));
    it("Logs the user out", function(){
        //console.log(state)
        console.log(localStorage.getItem("token"));
        expect(state.go).toHaveBeenCalled();
        expect(localStorage.token).toBe(undefined)

    })
})