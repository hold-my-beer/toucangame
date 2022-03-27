const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateProfile,
  updateSettings,
  saveStats,
} = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.route("/profile").post(auth, updateProfile);
router.route("/settings").post(auth, updateSettings);
router.put("/stats", saveStats);

module.exports = router;
