const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name must be fill"],
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, "email must be fill"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password must be fill"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "confirmpassword must be fill"],
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: "password and confirmpassword is not same",
    },
  },
});

userSchema.pre("save", async function (next) {
  this.confirmPassword = undefined;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.createJwt = async function () {
  return jwt.sign({ _id: this._id }, "" + process.env.PRIVATE_KEY);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
