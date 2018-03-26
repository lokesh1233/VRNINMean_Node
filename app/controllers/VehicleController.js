'use strict';

var mongoose = require('mongoose'),
  Params = mongoose.model('Params'),
  VRN = mongoose.model('VRNHeader'),
  Vehicle = mongoose.model('Vehicle');

exports.create_vehicle = function (req, res) {
  var new_vehicle = new Vehicle(req.body);
  new_vehicle.save(function (err, veh) {
    if (err)
      res.send(err);
    res.json(veh);
  });
};

exports.read_vehicle = function (req, res) {
  VRN.find({ VEHICLENUM: req.params.VehicleNumber, $or: [{ VRNSTATUS: 'R' }, { VRNSTATUS: 'C' }] }, function (err, vrn) {
    if (vrn.length > 0) {
      res.send({ message: "VRN " + vrn[0]._doc.VRN + " is open for vehicle number " + req.params.VehicleNumber });
      return;
    }

    Vehicle.find({ VehicleNumber: req.params.VehicleNumber }, function (err, veh) {
      if (err)
        res.send(err);
      try {
        Params.find({
          Domain: 'FleetList', modeNum: veh[0]._doc.FleetType
        }, function (err, prm) {
          if (err)
            res.json(veh);
          try {
            veh[0]._doc.FleetTypeDesc = '';
            for (var i = 0; i < prm.length; i++) {
              veh[0]._doc.FleetTypeDesc = prm[0]._doc.modeTxt;
            }
          } catch (error) { }
          res.json(veh);
        })
      } catch (error) { res.json(veh); }
    });
  })
};