'use strict';

var mongoose = require('mongoose'),
  hstData = '/sap/opu/odata/sap/Z_FIORI_VRN_IN_LITE_SRV';

function postSAPData(pth, data){
  var http = require('http');
  var dta = JSON.stringify(data);
  var options = {
    host: 'fiori_test3:Welcome.1@nwgwtgd.rjil.ril.com',
    port: '8000',
    path: hstData+pth+'?saml2=disabled',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': dta.length
    }
  };
  
  var req = http.request(options, function(res) {
    var msg = '';
  
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      msg += chunk;
    });
    res.on('end', function() {
      console.log(JSON.parse(msg));
    });
  });
  
  req.write(dta);
  req.end();


  // var xhr = new XMLHttpRequest();
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState == XMLHttpRequest.DONE) {
  //     console.log('updated data'+pth);
  // }
  // }
  // xhr.open('POST', hstData+pth+'?saml2=disabled', true);
  // xhr.send(data);
}

exports.createLicense =function(data) {
  var LICDta = {
    DriverName: data.Lastname,
    LicenceNum: data.Licencenumber,
    MobileNum: data.Telephone,
    RegionCode: data.Rg,
    ValidUpToDate: data.Validto
  }
  postSAPData('/LicenceCreateSet',LICDta);

}

exports.createVRNCheckOut = function(data) {
  var checkOut = {
    VRNCREHRDITMNAV:[{
      CheckType:"O",
      DepRemarks:data.REMARKS,
      LRDate:"0000-00-00T00:00:00",
      LRNum:data.LRNum,
      NoHus:data.NUMOFBOXES,
      Reject: "",
      SealCond:data.SEALCONDITION,
      TripNum:"",
      VRNCREITMDOCNAV:[{DocNum: "", DocType: ""}],
      VRNNum:data.VRN,
      VehicleStatus:data.VEHICLESTATUS
    }]
    }
    postSAPData('/VRNCreHdrSet',checkOut);
}

exports.createVRNReortAndCheckIn = function createVRNReortAndCheckIn(data, ind) {
  var report = {
    Indicator: data.CHECKININD == 'X' ? 'X' : '',
    VRNCREHRDVEHNAV: [{
				VehicleNum: ind == 'X'?data.VEHICLENUM:'',
				VendorNum:ind == 'X'?data.TRANSPORTERCODE:'',
				FleetType:ind == 'X'?data.FLEETTYPECODE:''
    }],
    VRNHDRITEMNAV: [{
      CheckType: "I",
      Depremarks: data.REMARKS,
      Depseal: data.SEAL1,
      DriverName: data.DRIVERNUM,
      DriverNum: data.DRIVERNUM,
      FleetType: data.FLEETTYPECODE,
      IDPrfNum: data.IDPROOFNUM,
      IDPrfType: data.IDPROOFTYPE,
      LRDate: "0000-00-00T00:00:00",
      LRNum: data.LRNUM,
      LicenceNum: data.LICENSENUM,
      NoHus: data.NUMOFBOXES,
      Purpose: "VEND_INB",
      SealCond: data.SEALCONDITION,
      TCNNum: "",
      TransCode: data.TRANSPORTERCODE,
      Transporter: data.TRANSPORTER,
      VRNITEMDOCNAV: [{ DocType: "", DocNo: "" }],
      VehStatus: data.VEHICLESTATUS,
      VehicleNum: data.VEHICLENUM,
      VehicleType: data.MODEOFTRANSPORT
    }]
  }
  postSAPData('/VRNCreateHdrSet',report);
}

exports.createVRNCheckIn = function(vrn) {
  var CheckData = {
    Indicator: "X",
    VRNNum: vrn
  }
  postSAPData('/CheckInSet',report);
}
