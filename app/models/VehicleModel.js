'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
    VehicleNumber: {
        type: String
    },
    VehicleDomicile: {
        type: String
    },
    ValidFrom: {
        type: String
    },
    to: {
        type: String
    },
    Vendor: {
        type: String
    },
    VehicleIdentifier: {
        type: String
    },
    VehicleCategory: {
        type: String
    },
    ServiceType: {
        type: String
    },
    FleetType: {
        type: String
    },
    LoadWeight: {
        type: String
    },
    Un: {
        type: String
    },
    LoadVolume: {
        type: String
    },
    VolumeUnit: {
        type: String
    },
    Capacity: {
        type: String
    },
    Avcapunit: {
        type: String
    },
    SpecialEquipment: {
        type: String
    },
    InsuranceDuedate: {
        type: String
    },
    MaintainanceDueDate: {
        type: String
    },
    VehicleStartKM: {
        type: String
    },
    EndKM: {
        type: String
    },
    PUCDateoftheVehicle: {
        type: String
    },
    RegistrationDate: {
        type: String
    },
    Remarks: {
        type: String
    }
});
  
module.exports = mongoose.model('Vehicle', VehicleSchema,  'Vehicle');