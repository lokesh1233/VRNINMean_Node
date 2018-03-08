'use strict';

var mongoose = require('mongoose'),
    VRN = mongoose.model('VRNHeader'),
    VRNDetail = mongoose.model('VRNDetail'),
    VRNCounter = mongoose.model('VRNCounter');

exports.list_all_vrns = function(req, res) {
  VRN.find({VRNSTATUS: ''}, function(err, vrn) {
    if (err)
      res.send(err);
    res.json(vrn);
  });
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
        res.send(VRNerr);
        var vrn_dtl = new VRNDetail(req.body.detailData);
        vrn_dtl.save(function(err, vrnbdy) {
        });
      res.json(vrn);
    });
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
    res.json({message:'VRN Checked in succesfully'+req.params.VRN, data:vrn});
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