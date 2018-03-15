'use strict';

var mongoose = require('mongoose'),
  VRN = mongoose.model('VRNHeader'),
  VRNDetail = mongoose.model('VRNDetail'),
  Params = mongoose.model('Params'),
  Role_Plant = mongoose.model('Role_Plant'),
  Vehicle = mongoose.model('Vehicle'),
  VRNCounter = mongoose.model('VRNCounter');

exports.list_all_vrns = function (req, res) {
  VRN.find({ $or: [{ VRNSTATUS: 'R' }, { VRNSTATUS: 'C' }] }, function (err, vrn) {
    if (err)
      res.send(err);
    Params.find({
      Domain: 'TrnsprtMode'
    }, function (err, prm) {
      if (err)
        res.json(vrn);
      Role_Plant.find({
        userId: 'P900001234'
      }, function (err, user) {
        if (err)
          res.json(vrn);
        if (user[0]._doc.roleId.indexOf('VRN_OUT') > -1) {
          for (var i = 0; i < vrn.length; i++) {
            vrn[i]._doc.VRNOut = 'X';
          }
        }
        res.json(vrn);
      })
      var dataPrm = {};
      try {
        for (var i = 0; i < prm.length; i++) {
          dataPrm[prm[i]._doc.modeNum] = prm[i]._doc.modeTxt;
        }
        for (var i = 0; i < vrn.length; i++) {
          vrn[i]._doc.TrnsprtMode = dataPrm[vrn[i]._doc.MODEOFTRANSPORT];
        }
      } catch (error) {
      }
    });
  })
};


function getNextSequenceVlue(sequenceName, next) {
  VRNCounter.findOneAndUpdate(
    { col1: sequenceName },
    { $inc: { seq: 1 } }, { new: true, upsert: true, fields: {} }, next
  )
}


exports.create_a_vrn = function (req, res) {

  getNextSequenceVlue('VRNNum', function (err, doc) {
    if (err) res(err);
    req.body.headerData.VRN = doc._doc.seq;
    req.body.detailData.VRN = doc._doc.seq;
    var new_vrn = new VRN(req.body.headerData);
    new_vrn.save(function (VRNerr, vrn) {
      if (VRNerr)
        res.send({ message: VRNerr.message, msgCode: "E", Payload: VRNerr });
      var vrn_dtl = new VRNDetail(req.body.detailData);
      vrn_dtl.save(function (err, vrnbdy) {
        if (req.body.headerData.VEHICLENUM) {
          Vehicle.findOneAndUpdate({ VehicleNumber: req.body.headerData.VEHICLENUM }, {
            '$set': {
              FleetType: req.body.headerData.FLEETTYPECODE, Vendor: req.body.headerData.TRANSPORTERCODE,
              VendorName: req.body.headerData.TRANSPORTER
            }
          }, { new: true, upsert: true }, function (err, vrndtl) {
          })
        }
      });
      res.json({ message: 'VRN: ' + doc._doc.seq + ' created sccesfully', msgCode: "S", Payload: vrn });
    });
  });
};

exports.update_vrn = function (req, res) {
  VRN.findOneAndUpdate({ VRN: req.params.VRN }, { '$set': { VRNSTATUS: "C" } }, { new: true, upsert: true }, function (err, vrn) {
    if (err)
      res.send(err);
    VRNDetail.findOneAndUpdate({ VRN: req.params.VRN }, { '$set': { VEHICLECHECKINDATE: new Date(), VEHICLECHECKINTIME: new Date() } }, { new: true, upsert: true }, function (err, vrndtl) {
    })
    res.json({ message: 'VRN ' + req.params.VRN + ' checked in succesfully ', msgCode: "S", Payload: vrn });
  });
};

exports.createVRNCheckOut = function () {
  VRN.findOneAndUpdate({ VRN: req.params.VRN }, { '$set': { VRNSTATUS: "X" } }, { new: true, upsert: true }, function (err, vrn) {
    if (err)
      res.send(err);
    var vrn_dtl = new VRNDetail(req.body);
    vrn_dtl.save(function (VRNerr, vrndtl) {
      if (VRNerr)
        res.send({ message: VRNerr.message, msgCode: "E", Payload: VRNerr });
      res.json({ message: 'VRN ' + req.params.VRN + ' checked out succesfully ', msgCode: "S", Payload: vrn });
    });
  });
}
