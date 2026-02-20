const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: String,
  category: String,
  type: String,
  price: Number,
  image: String,
  isBestSeller: Boolean,
  isNewLaunch: Boolean,
  description: String,
});

module.exports = mongoose.model("MenuItem", menuSchema);
