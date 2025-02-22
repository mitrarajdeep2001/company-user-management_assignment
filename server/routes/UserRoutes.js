const express = require("express");
const { createUser, getUser } = require("../controllers/UserController");

const router = express.Router();

router.post("/", createUser);
router.get("/:userId", getUser);

module.exports = router;
