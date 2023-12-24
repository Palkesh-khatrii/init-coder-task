const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);


db.users.hasMany(db.category, { as: "category" });
db.category.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.users.hasMany(db.products, { as: "product" });
db.products.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

db.category.hasMany(db.products, { as: "product", foreignKey: 'categoryId', onDelete: 'SET NULL', onUpdate: 'SET NULL' });
db.products.belongsTo(db.category, {
  foreignKey: "categoryId",
  as: "category",
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
});


// Synchronize the models with the database using alter: true
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("Database schema updated.");
// }).catch((err) => {
//   console.error("Error updating database schema:", err);
// });

module.exports = db;
