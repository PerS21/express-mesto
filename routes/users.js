const router = require('express').Router();
const {
  findUsers,
  findByIdUsers,
  findByIdAndUpdateUser,
  findByIdAndUpdateUserAvatar,
  findById,
} = require('../controllers/users');
const {
  celebrate,
  Joi
} = require('celebrate');

const isURL = (value) => {
  let result = validator.isURL(value);
  if (result) {
    return value;
  } else {
    throw new Error('URL validation err');
  }
};

router.get('/me', findById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required(),
  }),
}), findByIdAndUpdateUser);

router.patch('/me/avatar',celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(isURL)
  }),
}), findByIdAndUpdateUserAvatar);

router.get('/:userId', findByIdUsers);

router.get('/', findUsers);

module.exports = router;