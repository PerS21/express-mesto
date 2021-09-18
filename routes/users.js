const router = require('express').Router();
const {
  createUser,
  findUsers,
  findByIdUsers,
  findByIdAndUpdateUser,
  findByIdAndUpdateUserAvatar,
} = require('../controllers/users');

router.post('/', createUser);

router.get('/', findUsers);

router.get('/:userId', findByIdUsers);

router.patch('/me', findByIdAndUpdateUser);

router.patch('/me/avatar', findByIdAndUpdateUserAvatar);

module.exports = router;