const mongoose = require('mongoose');

const RespModelSchema = mongoose.Schema({
    time : {
        type : Date
    }, 
    method : {
        type : String
    },
    header : {
        type : Object
    },
    path : {
        type : String
    },
    query : {
        type : Object
    },
    body : {
        type : Object
    },
    duration : {
        type : Number
    }
})

const RespModel = module.exports = mongoose.model('RespModel', RespModelSchema);