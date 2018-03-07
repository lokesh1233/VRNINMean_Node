'use strict';

var mongoose = require('mongoose'),
    Transporter = mongoose.model('Transporter');

exports.read_transporters = function(req, res) {
    Transporter.find({}, function(err, transporter) {
    if (err)
      res.send(err);
    res.json(transporter);
  });
};