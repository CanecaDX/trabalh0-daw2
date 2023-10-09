module.exports = (sequelize, Sequelize) => {
  const Vendedor = sequelize.define(
    "vendedor",
    {
      nome: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      foto: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      id_loja: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Vendedor;
};
