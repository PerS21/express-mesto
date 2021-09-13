/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const routes  = require('./routes');
const process = require('process');


// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb').
  catch(error => handleError(error));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '613e0c3fefd6c1f58b5ad4fb' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

// eslint-disable-next-line no-unused-vars
module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

app.use(routes)