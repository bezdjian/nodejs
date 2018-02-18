var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var db = req.db; // get the DB from req that we saved in app.json

	db.connect(function(err){
	  //if(err) throw err;
	  console.log('Connected! - Querying...');
	  
	  db.query('SELECT * from person', function(err, rows, fields){
	  	if(err) throw err;
	  	/*
	  	display = "";
	  	rows.forEach(function(row) {
	    	display += row.firstname + ", " + row.lastname + ", " + row.email;
	    });
	    //res.send("Result: " + display);
	    */
	  	res.json(rows);
	  });
	});
	//res.send('Default send: respond with a resource');
});

// POST to users, ADD
router.post('/adduser', function(req, res){
	var db = req.db;
	console.info("RES: " + res);

	for (var key in res) {
		console.log(key + " -> " + res[key]);
	}
	
	//db.query('INSERT INTO person (firstname, lastname, email, country) VALUES ()')
	/*var collection = db.get('userList');
	collection.insert(req.body, function(err, result){
		res.send(
				(err === null) ? {msg: ''} : {msg: err}
			);
	});*/
});

module.exports = router;
