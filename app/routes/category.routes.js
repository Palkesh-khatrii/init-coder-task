import express from "express";
const router = express.Router()
const category = require("../controllers/category.controller.js");
const authValidate = require("../middleware/auth.js")
const { validateCategory } = require('../providers/validation.js');
const {upload} = require('../providers/upload.js')


// Create a new Tutorial
router.post("/addCategory", authValidate.tokenValidation, upload.single('image'), validateCategory, category.create);

// Retrieve all category
router.get("/",authValidate.tokenValidation, category.findAll);

// Retrieve a single category with id
router.get("/:id", authValidate.tokenValidation, category.findOne);

// Update a category with id
router.put("/:id", authValidate.tokenValidation, upload.single('image'), validateCategory, category.update);

// Delete a category with id
router.delete("/:id", authValidate.tokenValidation, category.delete);


module.exports = router;
