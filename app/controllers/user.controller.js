const db = require("../models");
const User = db.users;
import bcrypt from "bcrypt";
const auth = require("../middleware/auth")
const sendEmail = require("../providers/email")
import { validationResult } from 'express-validator';

// Signup (Create a new user)
export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, mobile, terms_cond } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      mobile,
      password: hashedPassword,
      terms_cond,
    };

    const user = await User.create(newUser);
    await sendEmail.sendWelcomeEmail(newUser);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// Login (Authenticate user)
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = auth.createToken(user.email, user.id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        terms_cond: user.terms_cond,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};
