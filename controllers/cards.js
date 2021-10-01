const Card = require('../models/card');
const FoundError = require('../utils/errors/notFound');
const ErrorCreating = require('../utils/errors/errorCreating');
const ValidationError = require('../utils/errors/validationError');
const NotEnoughRights = require('../utils/errors/notEnoughRights');

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({
        message: card,
      });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorCreating('Ошибка при создании'));
      }
      if (error.name === 'ValidationError') {
        next(new ValidationError('Неправильные данные'));
        return;
      }
      next(error);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationError('Карточки не найдены'));
      }
      next(error);
    });
};

module.exports.getCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card) res.send(card);
      else next(new FoundError('Карточка не найдена'));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new FoundError('Карточка не найдена'));
      }
      next(error);
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) next(new FoundError('Карточка не найдена'));
      if (!(card.owner.toString() === req.user._id)) return next(new NotEnoughRights('Недостаточно прав'));
      Card.findByIdAndRemove(req.params.cardId)
        .then((deleteCard) => {
          if (deleteCard) {
            res.send({
              message: 'Карточка удалена',
            });
          } else { next(new FoundError('Карточка не найдена')); }
        });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new FoundError('Карточка не найдена'));
      }
      next(error);
    });
};

module.exports.putLikes = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      next(new FoundError('Карточка не найдена'));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new FoundError('Карточка не найдена'));
      }
      next(error);
    });
};

module.exports.deleteLikes = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: {
      likes: req.user._id,
    },
  }, {
    new: true,
  })
    .then((card) => {
      if (card) {
        return res.send(card);
      }
      next(new FoundError('Карточка не найдена'));
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new FoundError('Карточка не найдена'));
      }
      next(error);
    });
};
