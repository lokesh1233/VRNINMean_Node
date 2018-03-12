'use strict';

var mongoose = require('mongoose'),
    VRN = mongoose.model('VRNHeader'),
    VRNDetail = mongoose.model('VRNDetail'),
    Params = mongoose.model('Params'),
    Vehicle = mongoose.model('Vehicle'),
    VRNCounter = mongoose.model('VRNCounter');

exports.list_all_vrns = function(req, res) {
  VRN.find({VRNSTATUS: ''}, function(err, vrn) {
    if (err)
      res.send(err);

      Params.find({
        Domain:'TrnsprtMode'}, function(err, prm) {
if (err)
res.json(vrn);
var dataPrm = {};
try {

for(var i=0;i<prm.length;i++){
dataPrm[prm[i]._doc.modeNum] =  prm[i]._doc.modeTxt;
}

for(var i=0;i<vrn.length;i++){
  vrn[i]._doc.TrnsprtMode = dataPrm[vrn[i]._doc.MODEOFTRANSPORT];
  }

} catch (error) {
  
}
    res.json(vrn);
  });
})
};


function getNextSequenceVlue(sequenceName,next){
VRNCounter.findOneAndUpdate(
    {col1: sequenceName },
     {$inc:{seq:1}}, { new: true, upsert: true, fields: {} }, next
    )
}


exports.create_a_vrn = function(req, res) {
  
getNextSequenceVlue('VRNNum',function(err,doc){
  if(err)res(err);
    req.body.headerData.VRN = doc._doc.seq ;
    req.body.detailData.VRN = doc._doc.seq ;
    var new_vrn = new VRN(req.body.headerData);
    new_vrn.save(function(VRNerr, vrn) {
      if (VRNerr)
        res.send({message:VRNerr.message,msgCode:"E", Payload:VRNerr});
        var vrn_dtl = new VRNDetail(req.body.detailData);
        vrn_dtl.save(function(err, vrnbdy) {
        });
        res.json({message:'VRN: '+doc._doc.seq+' created sccesfully' ,msgCode:"S", Payload:vrn});
    });

    // Vehicle.findOneAndUpdate({VehicleNumber: req.body.headerData.VEHICLENUM}, { '$set': {
    //   FleetType : '', Vendor : 
    // }}, {new: true, upsert: true}, function(err, vrndtl) {
    // })

    
});


  
  
 

    // count === 0 -> true 
 


//that.createVRNDtlData.VRN = that.createVRNData.VRN;
//  window.VRNUserDB.collection('VRNHeader').insertOne(that.createVRNData).then(function(){
//   that.openSnackBar('Succesflly placed VRN', '');
//   that.appComponent.loadVRNMasterList();
//   window.VRNUserDB.collection('VRNDetail').insertOne(that.createVRNDtlData).then(function(){
//     debugger;
//    });  
//   debugger;
// });  





  
};


exports.update_vrn = function(req, res) {
  VRN.findOneAndUpdate({VRN: req.params.VRN}, { '$set': {VRNSTATUS : "X"}}, {new: true, upsert: true}, function(err, vrn) {
    if (err)
      res.send(err);
      VRNDetail.findOneAndUpdate({VRN: req.params.VRN}, { '$set': {VEHICLECHECKINDATE  : new Date(), VEHICLESECURITYTIME: new Date() }}, {new: true, upsert: true}, function(err, vrndtl) {
      })
    res.json({message:'VRN Checked in succesfully '+req.params.VRN, msgCode:"S", Payload:vrn});
  });
};

/*exports.delete_a_vrn = function(req, res) {
  VRN.remove({
    _id: req.params.VRNNum
  }, function(err, vrn) {
    if (err)
      res.send(err);
    res.json({ message: 'VRN successfully deleted' });
  });
};*/