var path = require("path");
var mongoose = require('mongoose');
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// connection to the database
var connection = mongoose.createConnection("mongodb://localhost/Mongoosedb");

mongoose.connection.on('error', function(err){});
// mongoose schema
var MongooseSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    color: String
});

var Mongoose = connection.model('Mongoosedb', MongooseSchema);
// Validations
MongooseSchema.path('color').required(true, 'Color cannot be blank');
MongooseSchema.path('weight').required(true, 'Weight cannot be blank');
MongooseSchema.path('name').required(true, 'Name cannot be blank');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//Route folder created, makes it cleaner we're going to have /routes/index.js handle all of our routing
var route = require('./routes/index.js')(app, Mongoose);

// setting server to run on port 7500
app.listen(7500, function() {
 console.log("listening on port 7500");
})