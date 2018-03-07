'use strict';
var param = require('./ParamsController');
var mongoose = require('mongoose'),
    VRNDetail = mongoose.model('VRNDetail');

exports.create_vrn_detail = function(req, res) {
  var new_vrn_detail = new VRNDetail(req.body);
  new_vrn_detail.save(function(err, vrn) {
    if (err)
      res.send(err);
    res.json(vrn);
  });
};

exports.read_detail_vrn = function(req, res) {
    VRNDetail.find({VRN: req.params.VRN}, function(err, vrn) {
    if (err)
      res.send(err);
    res.json(vrn);
    var params = param.read_params();
    res.params = params;
  });
};