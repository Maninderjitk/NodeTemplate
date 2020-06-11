var express = require("express");
var User = require("../models/user");
var bcrypt = require("bcrypt");
var router = express.Router();
const Joi = require("@hapi/joi");

/* GET users listing. */
router.post("", async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .required(),
      // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    exp:Joi.number()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.send(error);
  }

  let email = req.body.email;
  let password = req.body.password;
  // console.log("password------", password);
  let email_lowercase = email.toLowerCase();
  //already exists

  if (await User.findOne({ email: email_lowercase })) {
    console.log("User found already");
    return res.send("Email already exists");
  }
  // encrypt password
  let hash = await bcrypt.hash(password, 10);
  //refined user info
  let userObj = { email: email_lowercase, hash: hash };
  const user = new User(userObj);
  // save user
  await user.save();
  res.send(user);
});
router.post("/login", async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
      .required(),
      // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    exp:Joi.number()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.send(error);
  }
  let email_lowercase = req.body.email.toLowerCase();
  let password = req.body.password;
  //make db query
  try {
    const user = await User.findOne({ email: email_lowercase });
   
    //if user does not exist.
    if (!user) {
      return res.send(" email does not exist, please signing up before login.");
    }
    //decrypt password and return jwt token with usser info.
    if (await bcrypt.compare(password, user.hash)) {
      const token = await user.generateToken();

      res.send({ token });
    }
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
