'use strict';

var mongoose = require('mongoose'),
    Vehicle = mongoose.model('Vehicle');

exports.create_vehicle = function(req, res) {
  var new_vehicle = new Vehicle(req.body);
  new_vehicle.save(function(err, veh) {
    if (err)
      res.send(err);
    res.json(veh);
  });
};

exports.read_vehicle = function(req, res) {
    Vehicle.find({VehicleNumber: req.params.VehicleNumber}, function(err, veh) {
    if (err)
      res.send(err);
    res.json(veh);
  });
};