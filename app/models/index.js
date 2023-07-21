const { dbConfig } = require("../../config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  ...dbConfig
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./users.model.js")(sequelize, Sequelize);
db.Post = require("./posts.model.js")(sequelize, Sequelize);
db.User.associate(db);
db.Post.associate(db);

module.exports = db;
