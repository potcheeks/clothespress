const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coloursSchema = new Schema({
  colours: { type: String, required: true },
  cloudinary_id: String,
  feelings: { type: String, required: true },
  occasion: { type: String, required: true},
  brand: { type: String, required: true },
  colours: [String]

  // colours from cloud vision API
});

const Colour = mongoose.model("Colour", colourSchema);

module.exports = Colour;