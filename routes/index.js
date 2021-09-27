const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const FoundError  = require('../utils/errors/notFound')

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('/', (req, res, next) =>{
  next(new FoundError('Страница не найдена'));
});

module.exports = router;