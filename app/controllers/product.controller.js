const { validationResult } = require("express-validator");
const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
const Category = db.category;
const User = db.users;
const { createObjectCsvWriter } = require('csv-writer');

// Create and Save a new Product
exports.create = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, details,categoryId } = req.body;
    const multiImagePaths = req.files.map((file) => file.path);
    const userId = req.decoded.id;

    // if (!title) {
    //   res.status(400).send({
    //     message: "Title can not be empty!"
    //   });
    //   return;
    // }

    const product = {
      title,
      details,
      multi_image: multiImagePaths,
      userId,
      categoryId,
      multi_cat_ass:'',
    };

    const data = await Product.create(product);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Product."
    });
  }
};

// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  try {
  const user = await User.findAll({
    include: [
      {
        model: Category,
        as: "category",
        include: [
          {
            model: Product,
            as: "product",
          },
        ],
      },
    ],
  });
  
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving products."
    });
  }
};

// Find a single Product with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product.findByPk(id);

    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Product with id=${id}.`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving Product with id=" + id
    });
  }
};

// Update a Product by the id in the request
exports.update = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;

    const num = await Product.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.send({
        message: "Product was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Product with id=" + id
    });
  }
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Product.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.send({
        message: "Product was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Could not delete Product with id=" + id
    });
  }
};


exports.exportToCSV = async (req, res) => {
  try {

    const data = await Product.findAll();

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, message: 'No products found.' });
    }

    const csvHeader = [
      { id: 'id', title: 'ID' },
      { id: 'title', title: 'Title' },
      { id: 'details', title: 'details' },
    ];

    const csvData = data.map((product) => ({
      id: product.id,
      title: product.title,
      details: product.details,
    }));

    const csvWriter = createObjectCsvWriter({
      path: 'product_list.csv',
      header: csvHeader,
    });

    await csvWriter.writeRecords(csvData);

    return res.status(200).json({ success: true, message: 'Product list exported to CSV file.' });
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



