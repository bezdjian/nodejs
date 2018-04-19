var db = require('../dbconnection');

var Person = {
    getAllPersons:function(callback){
        return db.query("SELECT * FROM person", callback);
    },
    getPersonById:function(id, callback){
        return db.query("SELECT * FROM person WHERE id=?", [id], callback);
    },
    insertPerson:function(Person, callback){
        var username = Person.firstname + "." + Person.lastname;
        var fullname = Person.firstname + " " + Person.lastname;
        
        var sql = 'INSERT INTO person (accounttype, username, firstname, lastname, fullName, email, country) ' +
	    'VALUES ("personal", "'+username.toLocaleLowerCase()+'",  "'+Person.firstname+'", "'+Person.lastname+'", "'+fullname+'", "'+Person.email+'", "'+Person.country+'" )';

        return db.query(sql, callback);
    },
    removePerson:function(userID, callback){
        var sql = 'DELETE from person where id=?';
	    return db.query(sql,[userID], callback);
    }
};

module.exports = Person;