const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect(
    "mongodb://localhost:27017/todo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    () => {
      console.log("database is ready");
    }
  );
};
