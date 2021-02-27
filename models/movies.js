var mongoose = require('mongoose');

var moviesSchema = mongoose.Schema({
    name: String,
    url: String,
});

var moviesModel = mongoose.model('movies', moviesSchema);

module.exports = moviesModel;