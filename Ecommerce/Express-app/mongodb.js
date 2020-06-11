const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;

const connectionURL = "mongodb://127.0.0.1:27017/Assignment";
const databaseName = "Assignment";

mongoClient.connect(
  connectionURL,
    { userNewUrlParser: true },
//   {
//     useUnifiedTopology: true,
//   },
  (error, cleint) => {
    if (error) {
      return console.log("unable to connect DataBase");
    }
       console.log("connected to database");
})