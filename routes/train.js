
var train = require("../models/train.js");


var tobj = {
    get: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
        };
        var query = train.find({}).populate("fromStationId toStationId trainTypeId");
        query.paginate(options, function (err, result) {
            if (err) throw err;
            res.json(result);
        });


    }
}

module.exports = tobj;