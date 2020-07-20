const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
  nickname:{
    type: String,
    required: true,
  },
  email:{
    type: String,
  },
  password:{
    type: String,
  },
  provider:{
    type: String,
    required: true,
    default: 'local'
  },
  snsId:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', userSchema);