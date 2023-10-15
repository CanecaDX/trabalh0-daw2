const db = require("../model");
const Loja = db.lojas;
const Op = db.Sequelize.Op;

// Create and Save a new Cachorro
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "O conteúdo não pode ser vazio.",
    });
    return;
  }

  // Create a Cachorro
  const loja = {
    nome: req.body.nome,
    endereco: req.body.endereco,
    descricao: req.body.descricao,
    foto: req.body.foto,
    email: req.body.email,
    senha: req.body.senha,
  };

  Loja.create(loja)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na criacao da Loja.",
      });
    });
};

// Retrieve all Cachorros from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Loja.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na procura das Lojas.",
      });
    });
};

// Find a single Cachorro with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Loja.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nao foi possivel achar a Loja com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao tentar retirar a Loja com o id=" + id,
      });
    });
};
// Update a Cachorro by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Loja.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "A loja foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Nao foi possivel fazer update na loja com o id=${id}. Talvez a loja nao foi encontrada ou req.body esta vazio!!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a loja com o id=" + id,
      });
    });
};

// Delete a Cachorro with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Loja.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "a Loja foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Nao foi possivel deletar a Loja com o id=${id}. Talvez a Loja não foi encontrada`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Nao foi possivel deletar a Loja com o id=" + id,
      });
    });
};

// Delete all Cachorros from the database.
exports.deleteAll = (req, res) => {
  Loja.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} As Lojas foram deletadas com sucessos!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Um erro ocorreu na remoção das Lojas.",
      });
    });
};
