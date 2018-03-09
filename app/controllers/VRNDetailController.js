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
                  modeNum:vrnDat.VEHICLESTATUS  ,
                  }]}, function(err, prm) {
          if (err)
          res.json(vrn);
          try {
          
          if(prm && prm[0] && prm[0]._doc){
          if(prm[0]._doc.Domain == 'SEALCONDITION'){
            vrnDat.VEHICLESTATUS = prm && prm[1] && prm[1]._doc ? prm[1]._doc.modeTxt : "";
            vrnDat.SEALCONDITION = prm && prm[0] && prm[0]._doc ? prm[0]._doc.modeTxt : "";
          }else{
            vrnDat.VEHICLESTATUS = prm && prm[0] && prm[0]._doc ? prm[0]._doc.modeTxt : "";
            vrnDat.SEALCONDITION = prm && prm[1] && prm[1]._doc ? prm[1]._doc.modeTxt : "";
          }
        }
      } catch (error) {
        res.json(vrn);
      }
      res.json(vrn);
        });
     
      
  });
};