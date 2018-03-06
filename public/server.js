var express = require('express'),
  app = express(),
  port = process.env.PORT || 4200,
  mongoose = require('mongoose'),
  VRNHeader = require('./api/models/VRNHeaderModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/vrndb');//https://cluster0-shard-00-00-lrnbl.mongodb.net:27017
mongoose.connect('mongodb://admin:admin123@cluster0-shard-00-00-lrnbl.mongodb.net:27017,cluster0-shard-00-01-lrnbl.mongodb.net:27017,cluster0-shard-00-02-lrnbl.mongodb.net:27017/VRN?authSource=admin&replicaSet=Cluster0-shard-0&ssl=true');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/VRNHeaderRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

app.listen(port);


console.log('VRN list RESTful API server started on: ' + port);





// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                        // create our app w/ express
    var mongoose = require('mongoose');              // mongoose for mongodb
    var VRNHeader = require('./api/models/VRNHeaderModel'); //created model loading here
    var morgan   = require('morgan');                // log requests to the console (express4)
    var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var database = require('./config/database');
    var port     = process.env.PORT || 8888;         // set the port


    // configuration ===============================================================
    mongoose.connect(database.url);     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/src'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // routes ======================================================================
    require('./app/routes.js')(app);

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);


