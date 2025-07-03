const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userData = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, mongooseUniqueValidator: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  place: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});
userData.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", userData);
