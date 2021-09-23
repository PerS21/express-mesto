const jwt = require('jsonwebtoken');
const user = require('../models/user');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(403)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, 'shhhhh', (err, decoded)=>{
    if (err) return res.status(401).send({
      message: 'Ошибка токена',
    });
    req.user = {
          _id: decoded.id,
        };
    return
  });

  next();
};