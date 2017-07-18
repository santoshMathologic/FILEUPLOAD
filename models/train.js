var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');
var train = new mongoose.Schema({
    trainNo: Number,
    trainName: String,
    trainType: String,
    fromStation: String,
    toStation: String,
    arrival: String,
    departure: String,
    startDay : [{type:Number}],
    runningDay : {type:Number,default:0},
    markDelete:{type:Boolean,default:false},
    createdTime: {type:Date , default:Date.now}
    
});
train.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('train', train);