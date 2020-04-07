const mongoose = require('mongoose');
const { Schema } = mongoose;
const projectSchema = new Schema({
  name:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  imgSrc:{
    type: String,
    required: true,
  },
  sourceLink:{
    type: String,
    required: true,
  },
  deployLink:{
    type: String,
    required: true,
  },
  blogLink:{
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Project', projectSchema);