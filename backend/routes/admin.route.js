const express = require("express");
const { isAdmin } = require("../middleware/auth");
const {
  viewResignations,
  concludeRegistration,
  viewAllResponses,
} = require("../controllers/admin.controller");
const router = express.Router();
router.get("/resignations", isAdmin, viewResignations);
router.put("/conclude_resignation", isAdmin, concludeRegistration);
router.get("/exit_responses", isAdmin, viewAllResponses);
module.exports = router;
