const mongoose = require('mongoose');
const { Schema } = mongoose;
const apiDocSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  header:{
    type: Array,
    required: true,
  },
  body:{
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('APIDoc', apiDocSchema);