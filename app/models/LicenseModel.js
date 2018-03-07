'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LicenseSchema = new Schema({
    Licencenumber: {
        type: String
    },
    Lastname: {
        type: String
    },
    Validto: {
        type: String
    },
    ValidityStatus: {
        type: String
    },
    ReasonCode: {
        type: String
    },
    UserName: {
        type: String
    },
    Date: {
        type: String
    },
    Time: {
        type: String
    },
    Name: {
        type: String
    },
    Name2: {
        type: String
    },
    City: {
        type: String
    },
    Rg: {
        type: String
    },
    Cty: {
        type: String
    },
    Telephone: {
        type: String
    },
    DriverNumber: {
        type: String
    }
});
  
module.exports = mongoose.model('License', LicenseSchema,  'License');