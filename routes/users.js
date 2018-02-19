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
	var fullname = req.body.firstname + " " + req.body.lastname;
	var username = req.body.firstname + "." + req.body.lastname;

	var sql = 'INSERT INTO person (accounttype, username, firstname, lastname, fullName, email, country) ' +
	'VALUES ("personal", "'+username.toLocaleLowerCase()+'",  "'+req.body.firstname+'", "'+req.body.lastname+'", "'+fullname+'", "'+req.body.email+'", "'+req.body.country+'" )';

	console.info('SQL in /adduser: ' + sql);
	db.query(sql);	

	res.end(JSON.stringify({"success" : " '" +fullname+ "' inserted Successfully", "status" : 200}));
});

module.exports = router;
