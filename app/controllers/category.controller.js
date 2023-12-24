const db = require("../models");
const Category = db.category;
const User = db.users;
import { validationResult } from 'express-validator';


// Create and Save a new Category
exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, details, } = req.body;
    const userId = req.decoded.id;

    // if (!title) {
    //   res.status(400).send({
    //     message: "Title can not be empty!"
    //   });
    //   return;
    // }

    // Create a Category
    const category = {
      title,
      details,
      userId,
      image: req.file ? req.file.path : '',
    };

    // Save Category in the database
    const data = await Category.create(category);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Category."
    });
  }
};

// Retrieve all Categorys from the database.
exports.findAll = async (req, res) => {
  try {
       const user = await User.findAll( {
        include:["category"]
    });
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving categorys."
    });
  }
};

// Find a single Category with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Category.findByPk(id);

    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Category with id=${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving Category with id=" + id
    });
  }
};

// Update a Category by the id in the request
exports.update = async (req, res) => {
  try {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const num = await Category.update(req.body, {
      where: { id: id }
    });
    if (num == 1) {
      res.send({
        message: "Category was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Category with id=" + id
    });
  }
};

// Delete a Category with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Category.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.send({
        message: "Category was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Category with id=" + id
    });
  }
};




