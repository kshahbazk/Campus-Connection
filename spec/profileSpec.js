/**
 * Created by johnfranklin on 4/16/16.
 */
/**
 * Created by johnfranklin on 4/16/16.
 */
describe("profile", function(){
    var scope, state, stateparams, oldScope, httpBackend, getController, q, t, uibModalInstance = {};
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
        $stateParams._id = '56e89c0876161965130d1b7f'
        spyOn(state, "go");
        getController = function(){return $controller('profile', {
            '$stateParams': stateparams,
            '$state': state,
            '$scope': scope,
            'oldScope': oldScope,
            '$uibModalInstance': uibModalInstance,

        })};
        t = {"_id":"56fcaace6f8fcfb9ca4e0bfc","productName":"Walk with Me a 500-Piece Jigsaw Puzzle by Sunsout Inc.","quality":3,"ppvPointer":{"_id":"56fcaa6e6f8fcfb9ca4e0bf5","ppv":14.864999999999998,"weight":10,"quality":3,"location":"San Jose State University","productName":"Walk with Me a 500-Piece Jigsaw Puzzle by Sunsout Inc.","__v":0,"createdAt":"2016-03-31T04:41:18.912Z"},"price":15,"title":"A decent looking Jigsaw puzzle...","description":"Jigsaw puzzle that we've completed and are offering to someone else.","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-03-31T04:42:54.546Z","searchArray":[]}
        q = [{"_id":"571404439caebb3d274b61a1","rating":5,"title":"Amazing","review":"They helped me find the light","recipientPointer":"56e88563217a5c6b0c35c5d9","__v":0,"createdAt":"2016-04-17T21:46:43.994Z"},{"_id":"5714060c4035f6d4507787e7","rating":5,"title":"34","review":"3","recipientPointer":"56e88563217a5c6b0c35c5d9","__v":0,"createdAt":"2016-04-17T21:54:20.255Z"},{"_id":"571407234035f6d4507787e9","rating":4,"title":"...","review":"...skrdugjhkrjdsb jkdfghbfdslkjghfbsljkhb","userPointer":{"_id":"571402779caebb3d274b619f","username":"thom","email":"john.franklin@sjsu.edu","firstName":"Thom","lastName":"Franklin","location":"San Jose State University","salt":"1bb11aa994df2038fe78e8b2389bfd26","hash":"7a3c1b5aa9a5c17ff170035b6eb6884dfd1655b4fd74cefbbd5c9800e30d7202360cddc29e8e8d41048f45e856ce5649e28ba7c1744d94e4ca218f6268c06832","__v":0,"createdAt":"2016-04-17T21:39:03.168Z","verified":false},"recipientPointer":"56e88563217a5c6b0c35c5d9","__v":0,"createdAt":"2016-04-17T21:58:59.594Z"}];
    }));
    beforeEach(function(){
        stateparams._id="56e88563217a5c6b0c35c5d9"
        httpBackend.whenGET("api/User/56e88563217a5c6b0c35c5d9?$populate=universityPointer").respond(t.userPointer)
        getController();
        httpBackend.whenGET("api/Feedback?$populate=userPointer&recipientPointer=56e88563217a5c6b0c35c5d9").respond(q)
        httpBackend.whenGET('components/LandingPage/NewLandingPage.ejs')
            .respond({response:"??? why does this happen?"});
        httpBackend.flush()
    })
    it("pulls the user and feedback", function () {

        expect(scope.ratings.map(function (z) {
            return {rating: z.rating, review: z.review, title: z.title}
        })).toEqual(q.map(function (z) {
            return {rating: z.rating, review: z.review, title: z.title}
        }));
    })
    it("Averages the review scores for profile", function () {
        //console.log(scope.total)
        expect(scope.total).toEqual(4.666666666666667)
    })
})
/**
 * Created by johnfranklin on 4/16/16.
 */
/**
 * Created by johnfranklin on 4/16/16.
 */
describe("modalController", function(){
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
        ////console.log(httpBackend)
        scope = $rootScope.$new();
        oldScope = {};
        oldScope.currentUser = {}
        oldScope.currentUser.firstName = 'Thom'
        oldScope.currentUser.lastName = 'Franklin'
            oldScope.currentUser._id = "56e88563217a5c6b0c35c5d9"
        oldScope.rev = {_id: '571404439caebb3d274b61a1', rating: 5, title: 'Amazing', review: 'They helped me find the light', recipientPointer: '56e88563217a5c6b0c35c5d9', __v: 0, createdAt: '2016-04-17T21:46:43.994Z'}
        oldScope.rev.$save = function(callback){
            callback();
        }
        scope.username = "johnfranklin42@gmail.com"
        scope.password = "..."
        ////console.log(scope)
        state = $state
        spyOn(state, "go");
        controller = $controller('modalController', {
            '$state': state,
            '$scope': scope,
            'oldScope': oldScope,
            '$uibModalInstance': uibModalInstance,

        });
    }));


    it("updates a review", function(){
        console.log(scope)
        scope.rev.rating = 1;
        scope.submit()
        expect(uibModalInstance.dismiss).toHaveBeenCalled();
    })
})