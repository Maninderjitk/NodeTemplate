const mongoose=require("mongoose");
const jwt = require('jsonwebtoken')
const tokenSchema =new mongoose.Schema({
    refresh_token:{
        type:String,
    }
})
const RefreshToken=mongoose.model("RefreshToken",tokenSchema);
module.exports=RefreshToken;