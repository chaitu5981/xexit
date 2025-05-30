const express = require("express");
const { isEmployee, isExEmp } = require("../middleware/auth");
const {
  submitResignation,
  submitResponses,
} = require("../controllers/user.controller");
const router = express.Router();
router.post("/resign", isEmployee, submitResignation);
router.post("/responses", isExEmp, submitResponses);
module.exports = router;
