module.exports = (sequelize, Sequelize) => {
  const Produto = sequelize.define(
    "produto",
    {
      titulo: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      preco: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      foto: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Produto;
};
