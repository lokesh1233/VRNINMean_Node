'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParamsSchema = new Schema({
    Domain: {
        type: String
    },
    modeNum: {
        type: String
    },
    modeTxt: {
        type: String
    },
    other1 : {
        type: String
    }
});
  
module.exports = mongoose.model('Params', ParamsSchema,  "Params");