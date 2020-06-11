const mongoose=require("mongoose");

const authorSchema=new mongoose.Schema({
    name:{
        type:String
    },
    books:[String],
    image_url:{
        type:String
    },
    description:{
        type:String
    }
})
const Author=mongoose.model('Author',authorSchema);
module.exports=Author;