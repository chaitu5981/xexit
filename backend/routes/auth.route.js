const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/auth.controller");
const { isLoggedIn } = require("../middleware/auth");
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-logged-user", isLoggedIn, getUser);
module.exports = router;
