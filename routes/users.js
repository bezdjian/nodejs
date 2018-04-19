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
	var p = person.insertPerson(req.body);

	str = JSON.stringify(req.body);
	str = JSON.parse(str);

	//Send response with Json.
    res.type('json');
	res.end(JSON.stringify({"success" : str.fullname + " inserted Successfully", "status" : 200}));
});

router.post('/removeuser/', function(req, res){
	var userID = req.body.id;
	person.removePerson(userID);

	//Send response with Json.
    res.type('json');
	res.end(JSON.stringify({"success" : "User with ID '"+userID+"' has successfully deleted", "status" : 200}));
	//res.redirect("/");
});

module.exports = router;
