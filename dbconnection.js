
// Mysql
//Make the DB Connection here to save it globally in request.
var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mylms"
});

db.connect(function(err){
  if(err) throw err;
})

module.exports = db;
// EO: Mysql