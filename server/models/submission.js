const mongoose = require('mongoose');
const { Schema } = mongoose;
const {Buffer}= require('buffer');

const imageSchema = new Schema({
  data: {type: String},
  description: { type: String },
  likes: { type: Number, default: 0 },
  username:{type: String},
  date:{type:Date,default:Date.now},
});
module.exports = mongoose.model('posts', imageSchema);