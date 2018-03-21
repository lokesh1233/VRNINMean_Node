'use strict';

var mongoose = require('mongoose'),
    License = mongoose.model('License'),
    LicenseRegion = mongoose.model('LicenseRegion'),
    Transporter = mongoose.model('Transporter'),
    Params = mongoose.model('Params'),
    Vehicle = mongoose.model('Vehicle');

exports.read_params = function(req, res) {
    Params.find({Domain:req.params.Domain}, function(err, prm) {
    if (err)
      res.send(err);
    res.json(prm);
  });
};


exports.updateTableData = function(req, res){
  var prmTable = req.body.table;
  if(prmTable == 'LicenseRegion'){
    LicenseRegion.insertMany(req.body.data, function(err, prm) {
      if (err)
        res.send(err);
      res.json(prm);
    });
  }else if(prmTable == 'Transporter'){
    Transporter.insertMany(req.body.data, function(err, prm) {
      if (err)
        res.send(err);
      res.json(prm);
    });
  }else if(prmTable == 'Vehicle'){
    Vehicle.insertMany(req.body.data, function(err, prm) {
      if (err)
        res.send(err);
      res.json(prm);
    });
  }else if(prmTable == 'License'){
    License.insertMany(req.body.data, function(err, prm) {
      if (err)
        res.send(err);
      res.json(prm);
    });
  }
  
}