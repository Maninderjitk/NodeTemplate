// // const mongoose = require("mongoose");
// const Joi = require('joi')
// const validator = require('express-joi-validation').createValidator({})

// // const bookSchema = new mongoose.Schema({
// // //  String(), title:Joi.types.
// //   title: {
// //     type: String,
// //   },
// //   price: {
// //     type: Number,
// //   },
// //   page_count: {
// //     type: Number,
// //   },
// //   image_url: {
// //     type: String,
// //   },
// //   description: {
// //     type: String,
// //   },
// //   author: {
// //     type: String,
// //   },
// //   comments: [String],
// // });
// // const Book=mongoose.model('Book',bookSchema);
// // module.exports=Book;
// const Book = Joi.object({
//     //  String(), title:Joi.types.
//       title: Joi.String().required(),
//       price:Joi.Number(),
//       price: Joi.Number(),
//       page_count: Joi.Number(),
//       image_url:  Joi.String(),
//       description: Joi.String(),
//       author: Joi.String(),
//       comments: [Joi.String()],
//     });
//     // const Book = Joi.validate(Book, bookSchema); 
// module.exports=Book;
