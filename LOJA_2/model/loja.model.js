module.exports = (sequelize, Sequelize) => {
  const Loja = sequelize.define(
    "loja",
    {
      nome: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      endereco: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      foto: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        //   primaryKey: true,
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Loja;
};
