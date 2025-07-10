const express = require("express");
const router = express.Router();

const mp4 = require("./router/mp4");

router.get("/mp4/", mp4);

module.exports = router;
