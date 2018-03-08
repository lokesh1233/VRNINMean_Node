// server.js

    // set up ========================
    var express  = require('express'),
    app      = express(),               // create our app w/ express
    mongoose = require('mongoose'),              // mongoose for mongodb
    morgan   = require('morgan'),                // log requests to the console (express4)
    VRNHeader = require('./app/models/VRNHeaderModel'), //created model loading here
    VRNDetail = require('./app/models/VRNDetailModel'), //created model loading here
    License = require('./app/models/LicenseModel'),
    LicenseRegion = require('./app/models/LicenseRegion'),
    ParamsModel = require('./app/models/ParamsModel'),
    TransporterModel = require('./app/models/TransporterModel'),
    VehicleModel = require('./app/models/VehicleModel'),
    bodyParser = require('body-parser'),         // pull information from HTML POST (express4)
    methodOverride = require('method-override'), // simulate DELETE and PUT (express4)
    database = require('./config/database'),
    port     = process.env.PORT || 8888;         // set the port
    mongoose.set('debug', true);    

    auto__Increment = require('mongoose-auto-increment');

    // configuration ===============================================================
    mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/dist'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // routes ======================================================================
    require('./app/routes/Routes.js')(app);

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);


