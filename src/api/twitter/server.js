const express = require("express");
const router = express.Router();

const videotwing = require("./router/video.twing");

router.get("/mp4/", videotwing);

module.exports = router;
