const express = require("express");
const router = express.Router();
const { runSIPSimulation } = require("../controllers/sipsimulationController");

router.post("/", runSIPSimulation);

module.exports = router;
