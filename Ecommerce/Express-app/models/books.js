const mongoose = require("mongoose");

// const validator = require('express-joi-validation').createValidator({})

const bookSchema = new mongoose.Schema({
//  String(), title:Joi.types.
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  page_count: {
    type: Number,
  },
  image_url: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  comments: [String],
});
const Book=mongoose.model('Book',bookSchema);

module.exports=Book;
