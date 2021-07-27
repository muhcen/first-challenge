const express = require("express");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/user", require("./../routers/user"));
  app.use("/api/list", require("./../routers/list"));

  app.use(require("./../controllers/errors"));
};
