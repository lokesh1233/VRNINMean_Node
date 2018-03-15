'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role_PlantSchema = new Schema({
    userId: {
        type: String
    },
    plant: {
        type: String
    },
    plantDesc: {
        type: String
    },
    roleId : {
        type: Array
    }
});
  
module.exports = mongoose.model('Role_Plant', Role_PlantSchema,  "Role_Plant");