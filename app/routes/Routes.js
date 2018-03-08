'use strict';
module.exports = function(app) {
  var vrnList = require('../controllers/VRNHeaderController');
  var vrnDetail = require('../controllers/VRNDetailController');
  var Params = require('../controllers/ParamsController');
  var license = require('../controllers/LicenseController');
  var licenseRegion = require('../controllers/LicenseRegionController');
  var transporter = require('../controllers/TransporterController');
  var vehicle = require('../controllers/VehicleController');

  // vrnList Routes
  app.route('/VRNHeader')
    .get(vrnList.list_all_vrns)
    .post(vrnList.create_a_vrn);

  app.route('/VRNDetail/:VRN')
    .get(vrnDetail.read_detail_vrn);
    //.put(vrnList.update_a_vrn)
    //.delete(vrnList.delete_a_vrn);
    app.route('/Params/:Domain')
    .get(Params.read_params);
    
  app.route('/License')
    .post(license.create_license);

  app.route('/License/:Licencenumber')
    .get(license.read_license);

  app.route('/LicenseRegion')
    .get(licenseRegion.read_license_region);

  app.route('/Transporter')
    .get(transporter.read_transporters);
  
  app.route('/Vehicle')
    .post(vehicle.create_vehicle);

  app.route('/Vehicle/:VehicleNumber')
    .get(vehicle.read_vehicle);
};