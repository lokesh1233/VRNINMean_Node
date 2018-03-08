'use strict';

var mongoose = require('mongoose'),
    Params = mongoose.model('Params');

exports.read_params = function(req, res) {
    Params.find({Domain:req.params.Domain}, function(err, prm) {
    if (err)
      res.send(err);
    res.json(prm);
  });
};