'use strict';
var param = require('./ParamsController');
var mongoose = require('mongoose'),
    Params = mongoose.model('Params'),
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
      var vrnDat = vrn[0]._doc;
    Params.find({$or : [{
                  Domain:'SEALCONDITION',
                  modeNum:vrnDat.SEALCONDITION,
                  }, {
                  Domain: 'VEHICLESTATUS',
                  modeNum:vrnDat.VEHICLESTATUS,
                  }]}, function(err, prm) {
          if (err)
          res.json(vrn);
          if(prm[0]._doc.Domain == 'SEALCONDITION'){
            vrnDat.VEHICLESTATUS = prm[1]._doc.modeTxt
            vrnDat.SEALCONDITION = prm[0]._doc.modeTxt;
          }else{
            vrnDat.VEHICLESTATUS = prm[0]._doc.modeTxt
            vrnDat.SEALCONDITION = prm[1]._doc.modeTxt;
          }
         res.json(vrn);
        });
     
      
  });
};