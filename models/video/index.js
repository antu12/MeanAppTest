const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vidSchema = new Schema({
  title: String,
  url: String,
  description: String
});

var video = mongoose.model('video', vidSchema);

module.exports = video;
