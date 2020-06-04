const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwt_decode = require("jwt-decode");

const auth = async (req, res, next) => {
  // try {
  console.log("in auth-------");

  // const token = req.header('Authorization').replace('Bearer', '');
  const token = req.header("Authorization");
  console.log("in auth1-------",token);
  // const decoded= jwt_decode(token);
  // console.log("decoded-------",decoded)
  const decoded = await jwt.verify(token, "thisismynewcourse");
  console.log("decoded------", decoded);
  const user = await User.findOne({ email: decoded.email });
  // console.log("user in auth-----",user)
  // log.info(user);
  if (!user) {
    throw new Error();
  }

  req.user = user;
  next();
  // } catch (e) {
  //     res.status(401).send({ error: 'Please authenticate.' })
  // }
};

module.exports = auth;
