'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Auth_userSchema = new Schema({
    userId: {
        type: String
    },
    pswd: {
        type: String
    }
});
  
module.exports = mongoose.model('Auth_user', Auth_userSchema,  "Auth_user");