import express from "express";
const router = express.Router()
const product = require("../controllers/product.controller.js");
const authValidate = require("../middleware/auth.js")
const { validateProduct } = require('../providers/validation.js');
const { upload} = require('../providers/upload.js')

// Create a new Tutorial
router.post("/addProduct", authValidate.tokenValidation, upload.array('multi_image', 5), validateProduct , product.create);

//export product data
router.get('/exportProduct', product.exportToCSV);

// Retrieve all product
router.get("/",authValidate.tokenValidation, product.findAll);

// Retrieve a single product with id
router.get("/:id", authValidate.tokenValidation, product.findOne);

// Update a product with id
router.put("/:id", authValidate.tokenValidation, upload.array('multi_image', 5), validateProduct, product.update);

// Delete a product with id
router.delete("/:id", authValidate.tokenValidation, product.delete);


module.exports = router;
