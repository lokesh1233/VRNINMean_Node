'use strict';

var mongoose = require('mongoose'),
    VRN = mongoose.model('VRNHeader');

exports.list_all_vrns = function(req, res) {
  VRN.find({VRNSTATUS: ''}, function(err, vrn) {
    if (err)
      res.send(err);
    res.json(vrn);
  });
};

exports.create_a_vrn = function(req, res) {
  var new_vrn = new VRN(req.body);
  new_vrn.save(function(err, vrn) {
    if (err)
      res.send(err);
    res.json(vrn);
  });
};

exports.read_a_vrn = function(req, res) {
  VRN.findById(req.params.VRNNum, function(err, vrn) {
    if (err)
      res.send(err);
    res.json(vrn);
  });
};

/*exports.update_a_vrn = function(req, res) {
  VRN.findOneAndUpdate({_id: req.params.VRNNum}, req.body, {new: true}, function(err, vrn) {
    if (err)
      res.send(err);
    res.json(vrn);
  });
};*/

/*exports.delete_a_vrn = function(req, res) {
  VRN.remove({
    _id: req.params.VRNNum
  }, function(err, vrn) {
    if (err)
      res.send(err);
    res.json({ message: 'VRN successfully deleted' });
  });
};*/