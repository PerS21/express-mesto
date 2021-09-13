/* eslint-disable no-undef */
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user)=>{res.send({data: user})})
  .catch(() => res.status(400).send({ message: 'Ошибка при создании' }))
}

module.exports.findUsers = (req,res) =>{
  User.find({})
  .then(users => res.send(users))
  .catch(() => res.status(404).send({ message: 'Пользователи не найдены' }));
}

module.exports.findByIdUsers = (req,res) =>{
  User.findById(req.params.userId)
  .then(user => res.send(user))
  .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
}

module.exports.findByIdAndUpdateUser = (req,res) =>{
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about})
  .then(user => res.send(user))
  .catch(() => res.status(400).send({ message: 'Ошибка при обновлении' }));
}

module.exports.findByIdAndUpdateUserAvatar = (req,res) =>{
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
  .then(user => res.send(user))
  .catch(() => res.status(400).send({ message: 'Ошибка при обновлении' }));
}