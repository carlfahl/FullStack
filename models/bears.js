var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BearSchema = new Schema({
  species: String,
  age: Number,
  name: String,
  weight: Number,
  location: String,
  attitude: String
});

module.exports = mongoose.model('Bear', BearSchema);
