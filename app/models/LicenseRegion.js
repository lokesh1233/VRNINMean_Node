'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LicenseRegionSchema = new Schema({
    Language: {
        type: String
    },
    Cty: {
        type: String
    },
    Rg: {
        type: String
    },
    Description: {
        type: String
    }
});
  
module.exports = mongoose.model('LicenseRegion', LicenseRegionSchema,  'LicenseRegion');