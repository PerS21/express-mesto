const router = require('express').Router();
const {
  findUsers,
  findByIdUsers,
  findByIdAndUpdateUser,
  findByIdAndUpdateUserAvatar,
  findById,
} = require('../controllers/users');

router.get('/me', findById);
router.patch('/me', findByIdAndUpdateUser);
router.patch('/me/avatar', findByIdAndUpdateUserAvatar);

router.get('/:userId', findByIdUsers);

router.get('/', findUsers);

module.exports = router;