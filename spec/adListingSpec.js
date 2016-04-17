/**
 * Created by johnfranklin on 4/16/16.
 */
/**
 * Created by johnfranklin on 4/16/16.
 */
describe("home", function(){
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
        controller = $controller('home', {

            '$scope': scope,

        });
        q = [{"_id":"56e89c0876161965130d1b7f","productName":"Xbox","quality":2,"price":400,"title":"New xbox!","imagePointer":"56e89c0376161965130d1b7c","description":"... A new thing","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-03-15T23:34:32.308Z","searchArray":[]},{"_id":"56fb06ecbb8d9a7b0b3a31e5","productName":"Xbox","quality":5,"price":500.99,"title":"5","description":"5","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-03-29T22:51:24.813Z","searchArray":[]},{"_id":"56fc8071f337b16dbe397ac6","productName":"(500) Days Of Summer","quality":4,"price":500,"title":"...","imagePointer":"56fc806af337b16dbe397ac4","description":"Help","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-03-31T01:42:09.179Z","searchArray":[]},{"_id":"56fcaace6f8fcfb9ca4e0bfc","productName":"Walk with Me a 500-Piece Jigsaw Puzzle by Sunsout Inc.","quality":3,"ppvPointer":{"_id":"56fcaa6e6f8fcfb9ca4e0bf5","ppv":14.864999999999998,"weight":10,"quality":3,"location":"San Jose State University","productName":"Walk with Me a 500-Piece Jigsaw Puzzle by Sunsout Inc.","__v":0,"createdAt":"2016-03-31T04:41:18.912Z"},"price":15,"title":"A decent looking Jigsaw puzzle...","description":"Jigsaw puzzle that we've completed and are offering to someone else.","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-03-31T04:42:54.546Z","searchArray":[]},{"_id":"56fded96ff01c38e325de9c0","productName":"Node.js Design Patterns","quality":3,"ppvPointer":{"_id":"56fded77ff01c38e325de9b8","ppv":40.98,"weight":10,"quality":3,"location":"San Jose State University","productName":"Node.js Design Patterns","__v":0,"createdAt":"2016-04-01T03:39:35.005Z"},"price":500,"title":"Help","imagePointer":"56fded90ff01c38e325de9be","description":"HELP","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-04-01T03:40:06.333Z","searchArray":[]},{"_id":"56fef3dec397129e0e70fd48","productName":"Whirlpool W10169313 Door Switch","quality":3,"ppvPointer":{"_id":"56fef3cdc397129e0e70fd41","ppv":7.385,"weight":10,"quality":3,"location":"San Jose State University","productName":"Whirlpool W10169313 Door Switch","__v":0,"createdAt":"2016-04-01T22:18:53.980Z"},"price":6,"title":"Awesome","description":"Help","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-04-01T22:19:10.029Z","searchArray":[]},{"_id":"570ac10f3e12bf50620c2bb7","productName":"Sunbeam 732-500 King Size Heating Pad with UltraHeatTechnology","quality":3,"price":500,"title":"322","description":"...","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-04-10T21:09:35.680Z","searchArray":[]},{"_id":"570ad12f3e12bf50620c2bbb","productName":"Apple iPhone 6 Plus - 128GB - 24K Mirror Gold/Black Plated Limited Edition with Diamond Crystals Customized Smartphone - International/Factory Unlocked","quality":3,"ppvPointer":{"_id":"56fc217b5ef2ac1d9da2cab5","ppv":1190,"weight":10,"quality":3,"location":"San Jose State University","productName":"Apple iPhone 6 Plus - 128GB - 24K Mirror Gold/Black Plated Limited Edition with Diamond Crystals Customized Smartphone - International/Factory Unlocked","__v":0,"createdAt":"2016-03-30T18:56:59.656Z"},"price":500,"title":"Neat iphone","description":"...","userPointer":{"_id":"56e88563217a5c6b0c35c5d9","hash":"60dbfd59603f660a5c956a794fddb535b4be7951796a255e7485d8ec2bf8c06dad28ba7e6c53d44ca7354895030e5f15c4e4fac165af2324e484d1cd9ff36377","salt":"87ee59ea746c0e24c2db1557b22aef54","location":"San Jose State University","lastName":"Franklin","firstName":"John","email":"johnfranklin42@gmail.com","username":"madmonk12345","__v":0,"createdAt":"2016-03-15T21:57:55.300Z","verified":false},"__v":0,"createdAt":"2016-04-10T22:18:23.573Z","searchArray":[]}]
        httpBackend.whenGET("api/Ad?$populate=userPointer+ppvPointer&$sort=createdAt").respond(q)
        httpBackend.whenGET('components/LandingPage/NewLandingPage.ejs')
            .respond({response:"??? why does this happen?"});
    }));

    it("pulls the ads into a local context", function(){
        //console.log(scope.ads)
        httpBackend.flush();
        //console.log(scope.ads)
        expect(scope.ads).not.toBe(undefined);
    })

})