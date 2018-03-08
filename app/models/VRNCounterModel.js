'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;  

var VRNCNSchema = new Schema({
  seq: {
      type: Number,
      default:0
    },
    col1: {
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
module.exports = mongoose.model('VRNCounter', VRNCNSchema,  "Counter");
