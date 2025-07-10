const express = require("express");
const router = express.Router();

const lookupUser = require("./router/lookup");

//LookUp
router.get("/user/:id", lookupUser);

module.exports = router;
