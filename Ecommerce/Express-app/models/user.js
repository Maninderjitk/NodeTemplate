const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const RefreshToken = require("./refresh-token");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  hash: {
    type: String,
  },
});
userSchema.methods.generateToken = async function () {
  console.log("in generate---");
  const user = this;
  const access_token = jwt.sign({ email: user.email }, "thisismynewcourse", {
    expiresIn: "1h",
  });
  const refresh_token = jwt.sign({ email: user.email }, "thisismynewcourse");
  const dbRefreshToken = new RefreshToken({ refreshToken: refresh_token });

  try {
    await dbRefreshToken.save();
  } catch (error) {
    res.status(400).send(error);
  }

  return { access_token, refresh_token };
};
const User = mongoose.model("User", userSchema);
module.exports = User;
