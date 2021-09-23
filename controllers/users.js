const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({
      email
    })
    .then((user) => {
      if (!validator.isEmail(email)) {
        return res.status(400).send({
          message: 'Невалидная почта',
        })
      }
      if (user) {
        return res.status(409).send({
          message: 'Пользователь с такой очтой уже существует',
        })
      };
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) return res.status(500).send({
          message: 'Ошабка создания пароля'
        });
        User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          })
          .then((user) => {
            res.send({
              data: user,
            });
          })
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

module.exports.findById = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      return res.send(user)
    })
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

module.exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: 'Ошибка запроса'
    })
  }

  User.findOne({
      email
    }).select('+password')
    .then(user => {
      if (!user) {
        return res.status(401).send({
          message: 'Неправильная почта или пароль',
        })
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) return res.status(500).send({
          message: 'Ошабка проверки'
        });

        if (!result) {
          return res.status(401).send({
            message: 'Неправильная почта или пароль'
          })
        }

        const token = jwt.sign({
          id: user._id
        }, 'shhhhh', {
          expiresIn: '1w'
        });

        return res.status(200).send({
          _id: user._id,
          jwt: token,
        })
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