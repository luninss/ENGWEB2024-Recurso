var express = require('express');
var router = express.Router();

var Livro = require('../controllers/livro');

router.get('/', function(req, res, next) {
  if (req.query.character) {
    Livro.listByCharacter(req.query.character)
      .then(data => res.json(data))
      .catch(error => res.status(500).json(error));
    
    return;
  }

  if (req.query.genre) {
    Livro.listByGenre(req.query.genre)
      .then(data => res.json(data))
      .catch(error => res.status(500).json(error));
    
    return;
  }

  Livro.list()
    .then(data => res.json(data))
    .catch(error => res.status(500).json(error));
});

router.get('/authors/:id', function(req, res, next) {
  Livro.listByAuthor(req.params.id)
    .then(data => res.json(data))
    .catch(error => res.status(500).json(error));
});

/* Devolve a lista dos personagens ordenada alfabeticamente e sem repetições */
router.get('/characters', function(req, res, next) {
  Livro.listCharacters()
    .then(data => res.json(data))
    .catch(error => res.status(500).json(error));
});

/* Devolve a lista de géneros ordenada alfabeticamente e sem repetições */
router.get('/genres', function(req, res, next) {
  Livro.listGenres()
    .then(data => res.json(data))
    .catch(error => res.status(500).json(error));
});

/* Devolve o registo com identificador id */
router.get('/:id', function(req, res, next) {
  Livro.findById(req.params.id)
    .then(data => res.json(data))
    .catch(error => res.status(500).json(error));
});

/* Acrescenta um registo novo à BD */
router.post('/', function(req, res, next) {
  Livro.insert(req.body)
    .then(data => res.json(data))
    .catch(error => res.status(500).json(error));
});

/* Elimina da BD o registo com identificador id */
router.delete('/:id', function(req, res, next) {
  Livro.remove(req.params.id)
    .then(data => res.json(data))
    .catch(error => res.status(500).json(error));
});

/* Atualiza o registo com identificador id */
router.put('/:id', function(req, res, next) {
  Livro.update(req.params.id, req.body)
    .then(data => res.json(data))
    .catch(error => res.status(500).json(error));
});

module.exports = router;
