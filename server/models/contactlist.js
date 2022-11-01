let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let contactModel = mongoose.Schema(
  {
    Name: String,
    ContactNumber: String,
    Email: String,
  },

  {
    collection: "list",
  }
);

//booksmodel to create new book more powerful than just class
module.exports = mongoose.model("contactlist", contactModel);
