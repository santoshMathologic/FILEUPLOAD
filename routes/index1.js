var Router = require('node-router');
var router = Router();    // create a new Router instance 
var route = router.push;  // shortcut for router.push() 
 
var train  = require("./train.js");

route('GET', '/api/v2/train/getTrains',train.get,function (req, res, next) {
 
    console.log(req);
});
