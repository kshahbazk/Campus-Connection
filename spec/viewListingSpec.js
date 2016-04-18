/**
 * Created by johnfranklin on 4/16/16.
 */
/**
 * Created by johnfranklin on 4/16/16.
 */
describe("viewListing", function(){
    var scope, state, stateparams, oldScope, httpBackend, controller, q, t, uibModalInstance = {};
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
        controller = $controller('viewListing', {
            '$stateParams': stateparams,
            '$state': state,
            '$scope': scope,
            'oldScope': oldScope,
            '$uibModalInstance': uibModalInstance,

        });
        t = {"_id":"56e89c0876161965130d1b7f","productName":"Xbox","quality":2,"price":400,"title":"New xbox!","imagePointer":"56e89c0376161965130d1b7c","description":"... A new thing","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-03-15T23:34:32.308Z","searchArray":[]}
        q = [{"_id":"571404439caebb3d274b61a1","rating":5,"title":"Amazing","review":"They helped me find the light","recipientPointer":"56e88563217a5c6b0c35c5d9","__v":0,"createdAt":"2016-04-17T21:46:43.994Z"},{"_id":"5714060c4035f6d4507787e7","rating":5,"title":"34","review":"3","recipientPointer":"56e88563217a5c6b0c35c5d9","__v":0,"createdAt":"2016-04-17T21:54:20.255Z"},{"_id":"571407234035f6d4507787e9","rating":4,"title":"...","review":"...skrdugjhkrjdsb jkdfghbfdslkjghfbsljkhb","userPointer":{"_id":"571402779caebb3d274b619f","username":"thom","email":"john.franklin@sjsu.edu","firstName":"Thom","lastName":"Franklin","location":"San Jose State University","salt":"1bb11aa994df2038fe78e8b2389bfd26","hash":"7a3c1b5aa9a5c17ff170035b6eb6884dfd1655b4fd74cefbbd5c9800e30d7202360cddc29e8e8d41048f45e856ce5649e28ba7c1744d94e4ca218f6268c06832","__v":0,"createdAt":"2016-04-17T21:39:03.168Z","verified":false},"recipientPointer":"56e88563217a5c6b0c35c5d9","__v":0,"createdAt":"2016-04-17T21:58:59.594Z"}];
        httpBackend.whenGET("api/Ad/56e89c0876161965130d1b7f?$populate=userPointer+ppvPointer").respond(t)
        httpBackend.whenGET("api/Feedback?$populate=userPointer&recipientPointer=56e88563217a5c6b0c35c5d9").respond(q)

        httpBackend.whenGET('components/LandingPage/NewLandingPage.ejs')
            .respond({response:"??? why does this happen?"});
        httpBackend.flush()
    }));
    it("pulls Feedback and the Ad", function(){

        expect(scope.ratings.map(function(z){ return {rating: z.rating, review: z.review, title: z.title}})).toEqual(q.map(function(z){ return {rating: z.rating, review: z.review, title: z.title}}));
        expect({price: scope.listing.price , quality: scope.listing.quality, l:scope.listing.location})
            .toEqual({price: t.price, quality: t.quality, l:t.location});
    })
    it("Averages the review scores", function(){
        console.log(scope.total)
        expect(scope.total).toEqual(4.666666666666667)
    })

})