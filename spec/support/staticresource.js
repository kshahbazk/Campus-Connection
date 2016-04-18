/**
 * Created by johnfranklin on 4/17/16.
 */
// static file for resource stuff. can't use it where it is by default because it's dynamically generated and tests don't involve the backend
app.factory('serverInfo', function(){
    /*
     pass any information as an object called data within the object. Can't pass it directly for now; can't find a way.
     Call serverInfo() and include serverInfo in the dependencies at the top of the controller to access in javascript files
     Can't be done elsewhere as this is the only page generated dynamically.
     */
    return {"settings":{"x-powered-by":true,"etag":"weak","env":"development","query parser":"extended","subdomain offset":2,"trust proxy":false,"views":"server","jsonp callback name":"callback","view engine":"ejs"},"models":["User","Ad","Feedback","File","Ppvcache","Product","University"],"_locals":{},"cache":false};//works. define what you want to transfer as data in those
})

var generateResource = function(name) {//
    //console.log(name);
    app.factory(name, function ($resource) {
        var q = $resource('api/' + name + '/:_id', {_id: '@_id'}, {
            update: {
                method: 'PUT'
            },
            create: {
                method: 'POST'
            }
        });
        q.prototype.$save = function(callback) {
            if (this._id) {
                return this.$update(callback);
            } else {
                return this.$create(callback);
            }
        };

        return q;
    });

}
var modelNameList = ["User","Ad","Feedback","File","Ppvcache","Product","University"];
for (var i = 0; i < modelNameList.length; i++)
    generateResource(modelNameList[i]);
