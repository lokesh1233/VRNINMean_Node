'use strict';

var mongoose = require('mongoose'),
    LicenseRegion = mongoose.model('LicenseRegion');

exports.read_license_region = function(req, res) {
    LicenseRegion.find({}, function(err, licreg) {
    if (err)
      res.send(err);
    res.json(licreg);
  });
};