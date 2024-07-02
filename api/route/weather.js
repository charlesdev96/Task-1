const express = require("express");
const router = express.Router();

const { main } = require("../controller/weather");

router.get("/api/hello", main);

module.exports = router;
