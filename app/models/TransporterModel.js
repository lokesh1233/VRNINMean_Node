'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransporterSchema = new Schema({
    Vendor: {
        type: String
    },
    Cty: {        
        type: String
    },
    Name1: {
        type: String
    },
    Name2: {
        type: String
    },
    Name3: {
        type: String
    },
    Name4: {
        type: String
    },
    City: {
        type: String
    },
    District: {
        type: String
    },
    POBox: {
        type: String
    },
    POBoxpcd: {
        type: String
    },
    PostalCode: {
        type: String
    },
    Rg: {
        type: String
    },
    SearchTerm: {
        type: String
    },
    Street: {
        type: String
    },
    Address: {
        type: String
    },
    Title: {
        type: String
    },
    Date: {
        type: String
    },
    Createdby: {
        type: String
    },
    ISRNumber: {
        type: String
    },
    Group: {
        type: String
    },
    Customer: {
        type: String
    },
    Telephone1: {
        type: String
    },
    Telephone2: {
        type: String
    }
});
  
module.exports = mongoose.model('Transporter', TransporterSchema,  'Transporter');