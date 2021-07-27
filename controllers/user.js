require("express-async-errors");
const User = require("./../models/user");

exports.signup = async (req, res) => {
  const user = await User.create(req.body);
  const token = await user.createJwt();
  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("Invalid email or password");

  const user = await User.findOne({ email: email });

  if (!user || !(await user.comparePassword(password)))
    throw new Error("email or password mismatch");

  const token = await user.createJwt();
  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
};
