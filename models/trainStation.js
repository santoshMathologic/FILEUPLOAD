var mongoose = require('mongoose');
var trainStationSchema = new mongoose.Schema({
    slNo: Number,
    trainNo: Number,
    stationCode: String,
    arrivalTime: String,
    departureTime: String,
    dayOfJourney: { type: Number },
    distance: { type: Number },
    
});
module.exports = mongoose.model('trainStation', trainStationSchema);