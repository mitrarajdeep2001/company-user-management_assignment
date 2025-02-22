const express = require("express");
const { createCompany, getCompany } = require("../controllers/CompanyController");

const router = express.Router();

router.post("/", createCompany);
router.get("/:companyId", getCompany);

module.exports = router;
