const mongoose = require('mongoose');
const { Schema } = mongoose;
const chatSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  nickName:{
    type: String,
    required: true,
  },
  chat: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', chatSchema);