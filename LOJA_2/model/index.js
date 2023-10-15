const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.avaliacoes = require("./avaliacao.model.js")(sequelize, Sequelize);
db.categorias = require("./categoria.model.js")(sequelize, Sequelize);
db.lojas = require("./loja.model.js")(sequelize, Sequelize);
db.produtos = require("./produto.model.js")(sequelize, Sequelize);
db.vendedores = require("./vendedor.model.js")(sequelize, Sequelize);

db.lojas.hasMany(db.produtos);
db.produtos.hasMany(db.categorias)
db.produtos.belongsTo(db.lojas);
module.exports = db;
