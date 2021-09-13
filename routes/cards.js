/* eslint-disable no-undef */
const router = require('express').Router();
const { createCard, getCards, getCardById, putLikes, deleteLikes } = require('../controllers/cards');



// eslint-disable-next-line no-unused-vars
router.post('/', createCard);

router.get('/', getCards)

router.get('/:cardId', getCardById)

router.put('/:cardId/likes', putLikes)

router.delete('/:cardId/likes', deleteLikes)


module.exports = router;