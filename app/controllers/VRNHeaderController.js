'use strict';

var mongoose = require('mongoose'),
  sapUpdateStr = require('./sapUpdateStr'),
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
    Params.find({$or : [{
      Domain:'TrnsprtMode'
      },{
      Domain: 'IDProffList'
      },{
        Domain:'FleetList'
        }]}, function (err, prm) {
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
          dataPrm[prm[i]._doc.Domain + prm[i]._doc.modeNum] = prm[i]._doc.modeTxt;
        }
        var vnrD;
        for (var i = 0; i < vrn.length; i++) {
          vnrD = vrn[i]._doc;
          vnrD.TrnsprtMode = dataPrm['TrnsprtMode'+vnrD.MODEOFTRANSPORT];
          vnrD.IDPROOFTYPE = dataPrm['IDProffList'+vnrD.IDPROOFTYPE];
          vnrD.FLEETTYPE = dataPrm['FleetList'+vnrD.FLEETTYPE];
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

function createVRNDetailData(data, vrno){
  return {
    CHECKINOUT: "I",
    NUMOFBOXES: data.NUMOFBOXES,
    REMARKS: data.REMARKS,
    SEAL1: data.SEAL1,
    SEAL2: data.SEAL2,
    SEALCONDITION: data.SEALCONDITION,
    VEHICLECHECKINDATE: data.CHECKININD == 'X'?new Date():"",
    VEHICLESECURITYDATE: new Date(),
    VEHICLESTATUS: data.VEHICLESTATUS,
    VRN: vrno,
    VRNCHECKINBY: data.CHECKININD == 'X'?'Bhaskar':""
  }
}




function createVRNHeaderData(data, vrno){
  return {
    CHANGEDBY: "",
    CHANGEDON: "",
    CREATEDBY: "Bhaskar",
    CREATEDON: new Date(),
    DRIVERNAME: data.DRIVERNAME,
    DRIVERNUM: data.DRIVERNUM,
    FLEETTYPE: data.FLEETTYPECODE,
    IDPROOFNUM: data.IDPROOFNUM,
    IDPROOFTYPE: data.IDPROOFTYPE,
    LICENSENUM: data.LICENSENUM,
    LRDATE: '',
    LRNUM: data.LRNUM,
    MODEOFTRANSPORT: data.MODEOFTRANSPORT,
    PURPOSE: '',
    SITE: "",
    TRANSPORTER: data.TRANSPORTER,
    TRANSPORTERCODE: data.TRANSPORTERCODE,
    VEHICLENUM: data.VEHICLENUM,
    VRN: vrno,
    VRNSTATUS: data.VRNSTATUS
  }
}


exports.create_a_vrn = function (req, res) {
  getNextSequenceVlue('VRNNum', function (err, doc) {
    if (err) res(err);
   var hdrData =  createVRNHeaderData(req.body, doc._doc.seq)
   var dtlData =  createVRNDetailData(req.body, doc._doc.seq)
   hdrData.VRN = doc._doc.seq;
   dtlData.VRN = doc._doc.seq;
    var new_vrn = new VRN(hdrData);
    new_vrn.save(function (VRNerr, vrn) {
      if (VRNerr)
        res.send({ message: VRNerr.message, msgCode: "E", Payload: VRNerr });
      var vrn_dtl = new VRNDetail(dtlData);
      vrn_dtl.save(function (err, vrnbdy) {
        req.body.VRN = dtlData.VRN;
        if (req.body.VEHICLENUM) {
          Vehicle.findOneAndUpdate({ VehicleNumber: req.body.VEHICLENUM }, {
            '$set': {
              FleetType: req.body.FLEETTYPECODE, Vendor: req.body.TRANSPORTERCODE,
              VendorName: req.body.TRANSPORTER
            }
          }, { new: true, upsert: true }, function (err, vrndtl) {
            try{
              var ind ='X';
              if(vrndtl != undefined){
                ind = vrndtl.isNew == false?'X':'';
              }
            sapUpdateStr.createVRNReortAndCheckIn(req.body, ind);
            }catch(err){

            }
          })
        }else{
          try{
            sapUpdateStr.createVRNReortAndCheckIn(req.body);
            }catch(err){

            }
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
    VRNDetail.findOneAndUpdate({ VRN: req.params.VRN }, { '$set': { VEHICLECHECKINDATE: new Date(),VRNCHECKINBY: 'Bhaskar'}  }, { new: true, upsert: true }, function (err, vrndtl) {
    })
    res.json({ message: 'VRN ' + req.params.VRN + ' checked in succesfully ', msgCode: "S", Payload: vrn });
    try{
      sapUpdateStr.createVRNCheckIn(req.params.VRN);
      }catch(err){

      }
   
  });
};

exports.createVRNCheckOut = function (req, res) {
  var obj = req.body;
  VRN.findOneAndUpdate({ VRN: obj.VRN }, { '$set': { VRNSTATUS: "X" } }, { new: true, upsert: true }, function (err, vrn) {
    if (err)
      res.send(err);
      var obj = req.body;
      obj.VEHICLESECURITYDATE  = new Date();
      obj.VEHICLECHECKINDATE  = new Date();
      obj.VRNCHECKINBY = 'Bhaskar';
      obj.CHECKINOUT = 'O';
    var vrn_dtl = new VRNDetail(req.body);
    vrn_dtl.save(function (VRNerr, vrndtl) {
      if (VRNerr)
        res.send({ message: VRNerr.message, msgCode: "E", Payload: VRNerr });
      
        try{
          sapUpdateStr.createVRNCheckOut(obj);
          }catch(err){
          }
      res.json({ message: 'VRN ' + obj.VRN + ' checked out succesfully ', msgCode: "S", Payload: vrn });
    });
  });
}