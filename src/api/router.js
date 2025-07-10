const express = require("express");
const router = express.Router();

const d_router = require("./discord/server");
router.use("/discord", d_router);

const tw_router = require("./twitter/server");
router.use("/tw", tw_router);

const embed_router = require("./embed/server");
router.use("/embed", embed_router);

module.exports = router;
