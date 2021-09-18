const Card = require('../models/card');

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link
  } = req.body;
  Card.create({
      name,
      link,
      owner: req.user._id,
    })
    .then((card) => {
      res.send({
        message: card
      });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send({
          message: 'Ошибка при создании',
        });
      }
      if (error.name === 'ValidationError') {
        res.status(400).send({
          message: 'Неправильные данные',
        });
        return
      }
      next(error);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send({
          message: 'Карточки не найдены',
        });
      }
      next(error);
    });
};

module.exports.getCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) res.send(card)
      else res.status(404).send({
        message: 'Карточка не найдена',
      });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: 'Ошибка запроса',
        });
      }
      next(error);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) res.send({message: 'Карточка удалена'})
      else res.status(404).send({
        message: 'Карточка не найдена',
      });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: 'Ошибка запроса',
        });
      }
      next(error);
    });
};

module.exports.putLikes = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
      $addToSet: {
        likes: req.user._id
      }
    }, {
      new: true
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send({
          message: 'Ошибка при обновлении',
        });
      }
      next(error);
    });
};

module.exports.deleteLikes = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
      $pull: {
        likes: req.user._id
      }
    }, {
      new: true
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: 'Ошибка при обновлении',
        });
      }
      next(error);
    });
};