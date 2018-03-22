'use strict';
var mongoose = require('mongoose'),
  request = require('request'),
  hstURL = 'http://fiori_test3:Welcome.1@nwgwtgd.rjil.ril.com:8000/sap/opu/odata/sap/Z_FIORI_VRN_IN_LITE_SRV';

function doCall(url, pData) {
  var token;
  var j = request.jar();

  var postDataToSAP = function () {
    return new Promise(function (resolve, reject) {
      request({
        url: hstURL,
        jar: j,
        headers: {
          "x-csrf-token": "Fetch"
        }
      }, function (error, response, body) {
        try {
          token = response.headers["x-csrf-token"];
          console.log("token csrf " + token);

          request({
            url: hstURL + url,
            method: 'POST',
            jar: j,
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": token, // set CSRF Token for post or update
            },
            json: pData
          }, function (error, response, body) {
            resolve();
          });
        } catch (err) {
          console.log("Cannot post data to sap in catch" + err);
        }
      });

    });
  }
  postDataToSAP();
}

function postSAPData(pth, data) {
  //fetchCSRFToken(pth, data);
  doCall(pth, data);
}

//0000-00-00T00:00:00
function dateFormate(myDate) {
  return myDate.substring(0, myDate.length - 5);
}

exports.createLicense = function (data) {

  var LICDta = {
    DriverName: data.Lastname,
    LicenceNum: data.Licencenumber,
    MobileNum: data.Telephone,
    RegionCode: data.Rg,
    ValidUpToDate: dateFormate(data.Validto)
  }
  postSAPData('/LicenceCreateSet', LICDta);

}

exports.createVRNCheckOut = function (data) {
  var checkOut = {
    VRNCREHRDITMNAV: [{
      CheckType: "O",
      DepRemarks: data.REMARKS,
      LRDate: "0000-00-00T00:00:00",
      LRNum: '',
      NoHus: data.NUMOFBOXES,
      Reject: "",
      SealCond: data.SEALCONDITION,
      TripNum: "",
      VRNCREITMDOCNAV: [{ DocNum: "", DocType: "" }],
      VRNNum: data.VRN.toString(),
      VehicleStatus: data.VEHICLESTATUS
    }]
  }
  postSAPData('/VRNCreHdrSet', checkOut);
}

exports.createVRNReortAndCheckIn = function createVRNReortAndCheckIn(data, ind) {
  var report = {
    Indicator: data.CHECKININD == 'X' ? 'X' : '',
    VRNCREHRDVEHNAV: [{
      VehicleNum: ind == 'X' ? data.VEHICLENUM : '',
      VendorNum: ind == 'X' ? data.TRANSPORTERCODE : '',
      FleetType: ind == 'X' ? data.FLEETTYPECODE : ''
    }],
    VRNHDRITEMNAV: [{
      CheckType: "I",
      Depremarks: data.REMARKS,
      Depseal: data.SEAL1,
      DriverName: data.DRIVERNAME,
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
  postSAPData('/VRNCreateHdrSet', report);
}

exports.createVRNCheckIn = function (vrn) {
  var CheckData = {
    Indicator: "X",
    VRNNum: vrn
  }
  postSAPData('/CheckInSet', CheckData);
}
