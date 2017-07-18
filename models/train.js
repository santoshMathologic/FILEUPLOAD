var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');
var train = new mongoose.Schema({
    trainNo: Number,
    trainName: String,
    stationCode: String,
    arrivalTime: String,
    departureTime: String,
    dayOfJourney: { type: Number },
    distance: { type: Number },
    
});
train.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('train', train);