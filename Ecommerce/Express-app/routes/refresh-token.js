var express = require("express");
var RefreshToken = require("../models/refresh-token");
var router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwt_decode = require("jwt-decode");
// const token={};
router.post("", async (req, res) => {
  var refreshToken = req.body.refresh_token;
  //   console.log("token----", refresh_Token);
  var dbToken = await RefreshToken.find({refreshToken:refreshToken});
  if (!dbToken === refreshToken) {
    return res.send("you are not authanticate user");
  }
  var decoded = await jwt.verify(refreshToken, "thisismynewcourse");
//   console.log("decoded-----", decoded);
  var user = new User({
    email: decoded.email,
  });
  var token= await user.generateToken();
  res.send(token);
});
module.exports = router;
