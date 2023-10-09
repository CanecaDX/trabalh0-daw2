module.exports = (sequelize, Sequelize) => {
    const Avaliacao = sequelize.define(
      "avaliacao",
      {
        id_produto: {
          type: Sequelize.STRING,
          //   primaryKey: true,
          allowNull: false,
        },
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
        email: {
          type: Sequelize.STRING,
          //   primaryKey: true,
          allowNull: false,
        },
        nome: {
          type: Sequelize.STRING,
          //   primaryKey: true,
          allowNull: false,
        },
        estrelas: {
          type: Sequelize.STRING,
          //   primaryKey: true,
          allowNull: false,
        },
      },
      { freezeTableName: true }
    );
  
    return Avaliacao;
  };
  