module.exports = function Route(app, Mongoose){
	// set errors_array to push some errors when adding a mongoose
	var errors_array = [];
	// route to index file
	app.get('/', function(req, res) {
	    Mongoose.find({}, function(err, mongoose) {
	      res.render('index', {errors: errors_array, mongooses: mongoose});
	    })
	})
	// route to add a new mongoose
	app.get('/mongooses/new', function(req, res){
	  res.render('new_mongoose', {errors: errors_array});
	})
	// route to show the information of a mongoose
	app.get('/mongooses/:id', function(req, res) {
	   Mongoose.findOne({_id: req.params.id}, function (err, mongoose){
	        console.log(errors_array);
	        res.render('mongoose', {mongoose: mongoose});
	    })
	})
	// route to edit a mongoose
	app.get('/mongooses/:id/edit', function(req, res) {
	   Mongoose.findOne({_id: req.params.id}, function (err, mongoose){
	        console.log(errors_array);
	        res.render('edit_mongoose', {mongoose: mongoose});
	    })
	})
  	//add a mongoose
	app.post('/mongooses', function(req, res) {
	  mongoose = new Mongoose({name: req.body.name, weight: req.body.weight, color: req.body.color});
	  mongoose.save(function(err) {
	    if(err) {
	      	for(var x in err.errors)
	      	{
	      		errors_array.push(err.errors[x].message);
	      	}
	      	res.redirect('/mongooses/new');
	      } else {
	        res.redirect('/');
	      }
	  })
	})
	//Edit a Mongoose
	app.post('/mongoose/:id', function (req, res){
	    Mongoose.update({_id: req.params.id}, {name: req.body.name, weight: req.body.weight, color: req.body.color}, function (err, mongoose){
	        res.redirect('/mongooses/'+req.params.id);
	    })
	})
	//Delete a Mongoose
	app.post('/mongooses/:id/destroy', function (req, res){
	    Mongoose.remove({_id: req.params.id}, function (err, user){
	        res.redirect('/');
	    })
	})
};