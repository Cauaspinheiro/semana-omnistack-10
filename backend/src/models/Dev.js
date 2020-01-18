const mongoose = require("mongoose");
const PointSchema = require("./util/PointSchema");

const DevSchema = new mongoose.Schema({
  name: { type: String, required: true },
  github_username: { type: String, required: true },
  bio: String,
  avatar_url: { type: String, required: true },
  techs: { type: [String], required: true },
  location: {
    type: PointSchema,
    index: "2dsphere"
  }
});

module.exports = mongoose.model("Dev", DevSchema);
