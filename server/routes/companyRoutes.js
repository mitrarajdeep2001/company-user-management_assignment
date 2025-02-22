const express = require("express");
const { createCompany, getCompany } = require("../controllers/companyController");

const router = express.Router();

router.post("/", createCompany);
router.get("/:companyId", getCompany);

module.exports = router;
