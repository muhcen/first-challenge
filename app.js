require("dotenv").config({ path: "./config" });
const express = require("express");
const app = express();

require("./config/database")();
require("./startup/middleware")(app);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
