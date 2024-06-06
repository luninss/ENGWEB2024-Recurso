const mongoose = require('mongoose');
var Livro = require('../models/livro');

module.exports.list = () => {
    return Livro.find().exec();
}

module.exports.findById = (id) => {
    return Livro.findOne({ bookId: id }).exec();
}

module.exports.listByCharacter = (character) => {
    return Livro.find({ characters: character }).exec();
}

module.exports.listByAuthor = (author) => {
    return Livro.find({ authors: author }).exec();
}

module.exports.listByGenre = (genre) => {
    return Livro.find({ genres: genre }).exec();
}

module.exports.listCharacters = () => {
    return Livro.distinct("characters").sort().exec();
}

module.exports.listGenres = () => {
    return Livro.distinct("genres").sort().exec();
}

module.exports.insert = (book) => {
    return Livro.findOne({ bookId: book.bookId }).exec().then(existingLivro => {
        if (!existingLivro) {
            var newLivro = new Livro(book);
            return newLivro.save();
        } else {
            return Promise.reject(new Error('Livro already exists'));
        }
    });
}

module.exports.remove = (id) => {
    return Livro.find({ bookId: id }).deleteOne().exec();
}

module.exports.update = (id, book) => {
    return Livro.findOneAndUpdate({ bookId: id }, book, { new: true }).exec();
}
