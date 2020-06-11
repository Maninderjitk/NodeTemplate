// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://127.0.0.1:27017/AssignmentEcommerce", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true ,
//     // useUnifiedTopology: true
//   // useCreateIndex: true,
// });
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/aAssignmentEcommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
