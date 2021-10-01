const jwt = require('jsonwebtoken');
const user = require('../models/user');
const NotEnoughRights = require('../utils/errors/notEnoughRights');
const ParamsError = require('../utils/errors/paramsError');


module.exports = (req, res, next) => {
  const {
    authorization
  } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotEnoughRights('Необходима авторизация'))
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, 'shhhhh', (err, decoded) => {
    if (err) return next(new ParamsError('Ошибка токена'))
    req.user = {
      _id: decoded.id,
    };
    return
  });

  next();
};