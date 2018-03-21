'use strict';

var mongoose = require('mongoose'),
    sapUpdateStr = require('./sapUpdateStr'),
    License = mongoose.model('License');

exports.create_license = function(req, res) {
  var new_license = new License(req.body);
  new_license.save(function(err, lic) {
    if (err)
      res.send(err);
     
      try{
        sapUpdateStr.createLicense(req.body);
        }catch(err){
        }
    res.json(lic);
  });
};


exports.read_license = function(req, res) {
    License.find({Licencenumber: req.params.Licencenumber}, function(err, lic) {
    if (err)
      res.send(err);
    res.json(lic);
  });
};