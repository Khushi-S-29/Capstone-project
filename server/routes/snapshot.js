const express = require("express");
const router = express.Router();
const { generateSnapshot } = require("../controllers/snapshotController");

router.post("/", generateSnapshot);

module.exports = router;
