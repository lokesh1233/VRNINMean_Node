'use strict';

var mongoose = require('mongoose'),
    Params = mongoose.model('Params');

exports.read_params = function(req, res) {
    Params.find({$or : [{
            Domain:'SEALCONDITION'
            }, {
            Domain: 'VEHICLESTATUS'
            }, { 
            Domain: 'TrnsprtMode'
            }]}, function(err, vrn) {
    if (err)
      res.send(err);
    res.json(vrn);
    return res;
  });
};