const router = require('express').Router();
const {
  createCard,
  getCards,
  getCardById,
  putLikes,
  deleteLikes,
  deleteCardById,
} = require('../controllers/cards');

router.post('/', createCard);

router.get('/', getCards);

router.get('/:cardId', getCardById);

router.delete('/:cardId', deleteCardById);

router.put('/:cardId/likes', putLikes);

router.delete('/:cardId/likes', deleteLikes);

module.exports = router;