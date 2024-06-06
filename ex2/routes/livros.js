var express = require('express');
var router = express.Router();
var axios = require('axios');
const livro = require('../../ex1/models/livro');
const api_dados = 'http://localhost:17000';

router.get('/', function(req, res, next) {
  axios.get(api_dados + '/books')
    .then(response => {
      res.render('livros', { livros: response.data });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

router.get('/:id', function(req, res, next) {
  axios.get(api_dados + '/books/' + req.params.id)
    .then(response => {
      res.render('livro', { livro: response.data });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});


router.get('/authors/:idautor', function (req, res, next) {
  axios.get(api_dados + '/books/authors/' + req.params.idautor)
    .then(response => {
      let livros = response.data;
      let count = livros.length;

      res.render('autor', { livros: livros, count: count, autor: req.params.idautor });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

module.exports = router;