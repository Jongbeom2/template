const mongoose = require('mongoose');
const { Schema } = mongoose;
const apiKeySchema = new Schema({
  key:{
    type: String,
    required: true,
  },
  domain:{
    type: String,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  expiredDate:{
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('APIKey', apiKeySchema);