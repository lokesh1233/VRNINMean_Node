'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VRNDetailSchema = new Schema({
    VRN: {
      type: String
    },
    CHECKINOUT: {
        type: String
    },
    VEHICLESTATUS: {
        type: String
    },
    SEALCONDITION: {
        type: String
    },
    REMARKS: {
        type: String
    },
    NUMOFBOXES: {
        type: String
    },
    SEAL1: {
        type: String
    },
    SEAL2: {
        type: String
    },
    VEHICLESECURITYDATE: {
        type: Date,
        Default: Date.now
    },
    VEHICLECHECKINDATE: {
        type: Date,
        Default: Date.now
    },
    VRNCHECKINBY: {
        type: String
    }
});
  
module.exports = mongoose.model('VRNDetail', VRNDetailSchema,  "VRNDetail");