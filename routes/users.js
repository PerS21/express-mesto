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
const validator = require("validator");

const checkUrl = (value) => {
  let result = validator.isURL(value);
  console.log(value)
  console.log(result)
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
    avatar: Joi.string().required().custom(checkUrl)
  }),
}), findByIdAndUpdateUserAvatar);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), findByIdUsers);

router.get('/', findUsers);

module.exports = router;