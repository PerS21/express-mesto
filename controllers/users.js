const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
  } = req.body;

  User.create({
      name,
      about,
      avatar,
    })
    .then((user) => {
      res.send({
        data: user,
      });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: 'Ошибка при создании',
        });
        return
      }
      next(error);
    })
};

module.exports.findUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send({
          message: 'Пользователи не найдены',
        });
        return
      }
      next(error);
    });
};

module.exports.findByIdUsers = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.send(user)
      else res.status(404).send({
        message: 'Пользователь не найден',
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

module.exports.findByIdAndUpdateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      about: req.body.about,
    }, {
      new: true,
      runValidators: true
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: 'Ошибка при обновлении',
        });
      }
      if (error.name === 'ValidationError') {
        res.status(404).send({
          message: 'Ошибка запроса',
        });
        return
      }
      next(error);
    });
};

module.exports.findByIdAndUpdateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
      avatar: req.body.avatar,
    }, {
      new: true,
      runValidators: true
    })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({
          message: 'Ошибка при обновлении',
        });
      }
      if (error.name === 'ValidationError') {
        res.status(404).send({
          message: 'Ошибка запроса',
        });
        return
      }
      next(error);
    });
};