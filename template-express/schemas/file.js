const mongoose = require('mongoose');
const { Schema } = mongoose;
const fileSchema = new Schema({
  contentType:{
    type: String,
    required: true,
  },
  image:{
    type: Buffer,
    required: true,
  },
  email:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('File', fileSchema);