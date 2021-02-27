var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
    }
    mongoose.connect('mongodb+srv://juliette:LaCapsule@cluster0.im7lb.mongodb.net/mymovizapp?retryWrites=true&w=majority',
    options,
    function(err) {
    console.log(err);
    }
    );