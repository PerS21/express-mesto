/* eslint-disable no-undef */
const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
  .then((card)=>{res.send({data: card})})
  .catch(() => res.status(400).send({ message: 'Ошибка при создании' }))
}

module.exports.getCards = (req,res) =>{
  Card.find({})
  .then(card => res.send(card))
  .catch(() => res.status(404).send({ message: 'Карточки не найдены' }));
}

module.exports.getCardById = (req,res) =>{
  Card.findById(req.params.cardId)
  .then(card => res.send(card))
  .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
}

module.exports.putLikes = (req,res) =>{
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id }}, { new: true },)
  .then((card) => res.send(card))
  .catch(() => res.status(400).send({ message: 'Ошибка при обновлении' }));
}

module.exports.deleteLikes = (req,res) =>{
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id }}, { new: true },)
  .then((card) => res.send(card))
  .catch(() => res.status(400).send({ message: 'Ошибка при обновлении' }));
}