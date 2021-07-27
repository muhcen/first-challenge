const jwt = require("jsonwebtoken");
const User = require("./../models/user");
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    throw new Error("first login after that you can access this route");

  const payload = jwt.verify(token, "" + process.env.PRIVATE_KEY);

  if (!payload) throw new Error("token not valid");

  const user = await User.findById(payload._id);

  if (!user) throw new Error("user not find with token");

  req.user = user;
  next();
};
