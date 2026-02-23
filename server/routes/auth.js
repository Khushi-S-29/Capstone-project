const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateLogin, validateSignup } = require("../middleware/validateAuth");
const { authLimiter } = require("../middleware/rateLimiter");

router.post("/signup", authLimiter, validateSignup, authController.signup);
router.post("/login", authLimiter, validateLogin, authController.login);

module.exports = router;
