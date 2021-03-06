const mongoose = require('mongoose');
const { Schema } = mongoose;
const fileSchema = new Schema({
  contentType:{
    type: String,
    required: true,
  },
  data:{
    type: Buffer,
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId:{
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('File', fileSchema);