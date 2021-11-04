const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  saveStats,
} = require("../controllers/userController");

router.route("/").post(registerUser);
router.post("/login", loginUser);
router.put("/stats", saveStats);

module.exports = router;
