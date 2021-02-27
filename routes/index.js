var express = require('express');
var router = express.Router();
var request = require('sync-request');
var moviesModel = require('../models/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/new-movies', function(req, res, next) {
  var result = request("GET", `https://api.themoviedb.org/3/discover/movie?api_key=d0ae04cce8f0b379e0ed05cbda43db60&language=fr&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
  var resultJSON = JSON.parse(result.getBody())
  
  var movies = []
  for (let i=0; i<resultJSON.results.length; i++) {
    var desc = resultJSON.results[i].overview.slice(0, 79)+'...';
    var img = '';
    if (resultJSON.results[i].backdrop_path) {
      img = 'https://image.tmdb.org/t/p/w500'+resultJSON.results[i].backdrop_path;
    } else {
      img = '/images/generique.jpg'
    }
    movies.push({name: resultJSON.results[i].original_title, img: img, desc: desc, note: resultJSON.results[i].vote_average, vote: resultJSON.results[i].vote_count})
  };
  
  res.json( movies)
})

router.post('/wishlist-movie', async function(req, res, next) {
  var newMovie = new moviesModel ({ 
    name: req.body.name,
    url: req.body.url,
    });
    
  await newMovie.save();
  res.json({ result: true })
})

router.delete('/wishlist-movie/:name', async function(req, res, next) {
  await moviesModel.deleteOne(   
    {name: req.params.name}, (err, d) => {
      if (err) return res.status(400)
      if (d.acknowledged && d.deletedCount == 1)
          console.log("Deleted Successfully")    // Use your response code
      else
          console.log("Record doesn't exist or already deleted")    // Use your response code
  });
  res.json({ result: true }) 
})

router.get('/wishlist-movie', async function(req, res, next) {
  var movies = await moviesModel.find();
  console.log(movies);
  res.json(movies); 
})

module.exports = router;
