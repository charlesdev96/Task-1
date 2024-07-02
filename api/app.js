require("dotenv").config();
const express = require("express");
const app = express();

const weather = require("./route/weather");

app.use(weather);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
