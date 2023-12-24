const User = require('./user.model');
const Product = require('./product.model');

module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    title: {
      type: Sequelize.STRING,
      unique: true,
    },
    details: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
  
  });


  return Category;
};
