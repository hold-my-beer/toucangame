const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  saveStats,
  updateSettings,
} = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.put("/stats", saveStats);
router.route("/settings").post(auth, updateSettings);

module.exports = router;
