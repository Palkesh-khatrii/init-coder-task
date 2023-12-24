import express from "express";
const router = express.Router();
const { createUser, loginUser } = require("../controllers/user.controller.js");
const validate = require("../providers/validation.js")



// Routes with validation middleware
router.post("/signup", validate.validateSignup, createUser);
router.post("/login", validate.validateLogin, loginUser);

module.exports = router;
