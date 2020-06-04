const mongoose=require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken')
const userSchema =new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    hash:{
        type:String
    }
})
userSchema.methods.generate_token =  function () {
   console.log("in generate---")
    const user = this
    const token = jwt.sign({ email:user.email },'thisismynewcourse');
    // console.log("token-----",token)
    return token;
}
const User=mongoose.model("User",userSchema);
module.exports=User;