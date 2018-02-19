var express = require('express');
var router = express.Router();
var person = require('../models/person');

/* GET users listing. */
router.get('/', function(req, res, next) {

	person.getAllPersons(function(err, rows){
		res.json(rows);
	});
});

// POST to users, ADD
router.post('/adduser', function(req, res){
	person.insertPerson(req.body);

	//Send response with Json.
	res.end(JSON.stringify({"success" : " '" +fullname+ "' inserted Successfully", "status" : 200}));
});

router.post('/removeuser', function(req, res){
	var userID = req.body.id;
	person.removePerson(userID);
	
	//Send response with Json.
	res.end(JSON.stringify({"success" : "User with ID '"+userID+"' has successfully deleted"}));
});

module.exports = router;
