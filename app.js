const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const routes = require('./routes');
const {login, createUser} = require('./controllers/users');
const auth = require('./middlewares/auth');

// Слушаем 3000 порт
const {
  PORT = 3000,
} = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((error) => handleError(error));

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6145f0a493e5c92f294fb767',
//   };
//   next();
// });

module.exports.createCard = (req, res) => {
  console.log(req.user._id)
};

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(routes);

app.use((err, req, res, next) => {
  res.status(500).send({
    message: 'На сервере произошла ошибка',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
