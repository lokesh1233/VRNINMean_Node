'use strict';

var mongoose = require('mongoose'),
     request = require('request'),
  hstURL = 'http://nwgwtgd.rjil.ril.com:8000/sap/opu/odata/sap/Z_FIORI_VRN_IN_LITE_SRV';

// "X-CSRF-Token":"Fetch"   
function fetchCSRFToken(pth, data){
  var http = require('http');
  var dta = JSON.stringify(data);
  var options = {
    host: 'nwgwtgd.rjil.ril.com',
    auth: 'fiori_test3:Welcome.1',
    port: '8000',
    path: hstData+'?saml2=disabled',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      "X-CSRF-Token":"Fetch" 
    }
  };
  

//   var URL = require('url');

//  console.log(new URL('http://abc:xyz@example.com'));

  try{
    
  var req = http.request(options, function(res) {
    var msg = '';
  
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      msg += chunk;
    });
     res.on('end', function() {
       console.log('error: '+msg);
       try{
        console.log('csrf token'+res.headers['x-csrf-token']);
        fetchCSRFTokenandPost(pth, data, res.headers['x-csrf-token'])
       }catch(err){
        console.log('error in res end catch: '+err);
       }
     });
  });
  
  req.on('error', function(e) {
    console.error('problem with request: '+e.message);
  });

  req.write(null);
  req.end();

}catch(err){
console.log('error upating to sap');
}
}



function doCall(url, pData){
  var token;
  var j = request.jar();

  var postDataToSAP = function(){
    return new Promise(function(resolve, reject){
      request({ 
                url : hstURL, 
                jar : j,
                headers: { 
                            "Authorization": "Basic ZmlvcmlfdGVzdDM6V2VsY29tZS4x",
                            "x-csrf-token" : "Fetch" 
                }
              }, function(error, response, body){
                try{
                  
                    token = response.headers["x-csrf-token"];
                    console.log("token csrf "+token);

                    request({
                                    url:hstURL+url,
                                    method: 'POST',
                                    jar: j,
                                    headers:{
                                              "Authorization":"Basic ZmlvcmlfdGVzdDM6V2VsY29tZS4x",
                                              "Content-Type":"application/json",
                                              "X-CSRF-Token":token, // set CSRF Token for post or update
                                    },
                                    json: pData
                            }, function(error, response, body){
                                  console.log("Cannot post data to sap"); 
                                  console.log(error);           
                                  console.log(response);  
                                  console.log(body);  
                                  
                                  resolve();
                            });   
                          }catch(err){
                            console.log("Cannot post data to sap in catch"+err); 
                          }  
                  });
                
    });    
  }
  
  postDataToSAP(); 
}






function postSAPData(pth, data){
  //fetchCSRFToken(pth, data);
  
  doCall(pth, data);

 













}

function fetchCSRFTokenandPost(pth, data, csrfTken){
  
  var http = require('http');
  var dta = JSON.stringify(data);
  var options = {
    host: 'nwgwtgd.rjil.ril.com',
    auth: 'fiori_test3:Welcome.1',
    port: '8000',
    path: hstData+pth+'?saml2=disabled',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': dta.length,
      "X-CSRF-Token":csrfTken
    }
  };
  
  try{
    
  var req = http.request(options, function(res) {
    var msg = '';
  
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      msg += chunk;
    });
     res.on('end', function() {
       console.log('error: '+msg);
     });
  });
  
  req.on('error', function(e) {
    console.error('problem with request: '+e.message);
  });

  req.write(dta);
  req.end();

}catch(err){
console.log('error upating to sap');
}

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

  //data.Validto


  var LICDta = {
    DriverName: data.Lastname,
    LicenceNum: data.Licencenumber,
    MobileNum: data.Telephone,
    RegionCode: data.Rg,
    ValidUpToDate: "0000-00-00T00:00:00" //data.Validto
  }
  postSAPData('/LicenceCreateSet',LICDta);

}

exports.createVRNCheckOut = function(data) {
  var checkOut = {
    VRNCREHRDITMNAV:[{
      CheckType:"O",
      DepRemarks:data.REMARKS,
      LRDate:"0000-00-00T00:00:00",
      LRNum:'',
      NoHus:data.NUMOFBOXES,
      Reject: "",
      SealCond:data.SEALCONDITION,
      TripNum:"",
      VRNCREITMDOCNAV:[{DocNum: "", DocType: ""}],
      VRNNum:data.VRN.toString(),
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
