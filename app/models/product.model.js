const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    title: {
      type: Sequelize.STRING
    },
    details: {
      type: Sequelize.STRING
    },
    multi_image: {
      type:Sequelize.BLOB('long')
   
    },
    multi_cat_ass: {
      type: Sequelize.STRING
    },
  });

  return Product;
};
