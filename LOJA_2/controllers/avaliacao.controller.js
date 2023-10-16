const db = require("../models");
const Avaliacao = db.avaliacoes;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.titulo) {
    res.status(400).send({
      message: "O conteudo nao pode ser vazio",
    });
    return;
  }

  const avaliacao = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    email: req.body.email,
    nome: req.body.nome,
    estrelas: req.body.estrelas,
  };

  Avaliacao.create(avaliacao)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na criacao da Avaliação",
      });
    });
};

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Avaliacao.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na procura das Avaliações.",
      });
    });
};

// Find a single Cachorro with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Avaliacao.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nao foi possivel achar a Avaliação com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao tentar retirar a Avaliação com o id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Avaliacao.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Avaliação foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Nao foi possivel fazer update na Avaliação com o id=${id}. Talvez a Avaliação não foi encontrada ou req.body esta vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a Avaliação com o id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Avaliacao.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "a Avalição foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Nao foi possivel deletar a Avaliação com o id=${id}. Talvez Avaliação não foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Nao foi possivel deletar a Avaliação com o id=" + id,
      });
    });
};


exports.deleteAll = (req, res) => {
  Avaliacao.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Avaliações foram deletadas com sucessos!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Um erro ocorreu na remoção das Avaliações.",
      });
    });
};
