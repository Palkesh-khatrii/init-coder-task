import { body } from "express-validator";
const db = require("../models");
const User = db.users;
const Category = db.category;
const Product = db.products;



// Validation middleware for user signup
export const validateSignup = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body('mobile')
    .isMobilePhone()
    .withMessage('Invalid mobile number')
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({
        where: { mobile: value },
      });

      if (existingUser) {
        throw new Error('Mobile number is already in use');
      }

      return true;
    }),
  ];
  
  // Validation middleware for user login
  export const validateLogin = [
    body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ];

  export const validateCategory = [
    body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .custom(async (value) => {
      const existingCategory = await Category.findOne({
        where: { title: value },
      });

      if (existingCategory) {
        throw new Error('Title must be unique');
      }
      return true;
    }),
    body('details').trim().notEmpty().withMessage('Details are required'),

  ];

  export const validateProduct = [
    body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .custom(async (value) => {
      const existingProduct = await Product.findOne({
        where: { title: value },
      });

      if (existingProduct) {
        throw new Error('Title must be unique');
      }
      return true;
    }),
    body('details').trim().notEmpty().withMessage('Details are required'),
  ];



  