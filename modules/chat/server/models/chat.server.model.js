'use strict';

/**
 * Module dependencies
 */

 var mongoose = require('mongoose'),
 Schema = mongoose.Schema;


 /**
  * Chat history
  */
var chatSchema = new Schema({
  type : String,
  created : String,
  profileImageURL: String,
  username: String
});

mongoose.model('Chat', chatSchema);