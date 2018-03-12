'use strict';
var mongoose = require('mongoose'),
 autoIncrement = require("mongodb-autoincrement"),
  Schema = mongoose.Schema;  

var VRNSchema = new Schema({
    VRN: {
      type: Number,
      default:0,
        unique: true
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
      type: String,
      Default: Date.now
    },
    CREATEDBY: {
      type: String
    },
    CREATEDON: {
      type: String,
      Default: Date.now
    },
    TRANSPORTER: {
      type: String
    },
    TRANSPORTERCODE: {
      type: String
    }
});

// autoIncrement.setDefaults({
//   collection:'VRNHeader',
//   field:'VRN',
//   step:1
// })
  
// VRNSchema.plugin(autoIncrement.mongoosePlugin, {field:'VRN',
//   step:1 });
module.exports = mongoose.model('VRNHeader', VRNSchema,  "VRNHeader");



