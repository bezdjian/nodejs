var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var db = req.db; // get the DB from req that we saved in app.js

	db.connect(function(err){
	  if(err) throw err;
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

module.exports = router;
