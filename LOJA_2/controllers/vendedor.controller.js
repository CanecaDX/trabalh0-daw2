const db = require("../models");
const Vendedor = db.vendedores;
const Op = db.Sequelize.Op;

// Create and Save a new Cachorro
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "O conteúdo nao pode ser vazio",
    });
    return;
  }

  // Create a Cachorro
  const vendedor = {
    nome: req.body.nome,
    telefone: req.body.telefone,
    foto: req.body.foto,
  };

  Vendedor.create(vendedor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na criacao do Vendedor",
      });
    });
};

// Retrieve all Cachorros from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Vendedor.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na procura dos Vendedores.",
      });
    });
};

// Find a single Cachorro with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vendedor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nao foi possivel achar o Vendedor com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao tentar retirar o Vendedor com o id=" + id,
      });
    });
};
// Update a Cachorro by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Vendedor.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vendedorfoi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Nao foi possivel fazer update no Vendedor com o id=${id}. Talvez o Vendedor nao foi encontrada ou req.body esta vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar o Vendedor com o id=" + id,
      });
    });
};

// Delete a Cachorro with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vendedor.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "O Vendedor foi deletado com sucesso!",
        });
      } else {
        res.send({
          message: `Nao foi possivel deletar o Vendedor com o id=${id}. Talvez o Vendedor não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Nao foi possivel deletar o Vendedor com o id=" + id,
      });
    });
};

// Delete all Cachorros from the database.
exports.deleteAll = (req, res) => {
  Vendedor.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Vendedores foram deletados com sucessos!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Um erro ocorreu na remoção dos Vendedores .",
      });
    });
};
