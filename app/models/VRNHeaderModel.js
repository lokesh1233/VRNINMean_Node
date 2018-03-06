'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VRNSchema = new Schema({
    VRN: {
      type: String
    },
    MODEOFTRANSPORT: {
      type: String
    },
    PURPOSE: {
      type: String
    },
    SITE: {
      type: String
    },
    VEHICLENUM: {
      type: String
    },
    DRIVERNAME: {
      type: String
    },
    DRIVERNUM: {
      type: String
    },
    FLEETTYPE: {
      type: String
    },
    IDPROOFNUM: {
      type: String
    },
    IDPROOFTYPE: {
      type: String
    },
    LRNUM: {
      type: String
    },
    LRDATE: {
      type: String
    },
    LICENSENUM: {
      type: String
    },
    VRNSTATUS: {
      type: String
    },
    CHANGEDBY: {
      type: String
    },
    CHANGEDON: {
      type: String
    },
    CREATEDBY: {
      type: String
    },
    CREATEDON: {
      type: String
    },
    TRANSPORTER: {
      type: String
    },
    TRANSPORTERCODE: {
      type: String
    }
});
  
module.exports = mongoose.model('VRNHeader', VRNSchema,  "VRNHeader");