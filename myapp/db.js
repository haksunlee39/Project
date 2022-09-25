var mysql = require('mysql');
var db;

function connectDatabase() {
    if (!db) {
        
        db = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'asdf',
            database : 'projectdata',
            multipleStatements: true
        })
        db.connect((err) => {
            if (err) throw err;
            console.log('Database Connected');
        });
    }
    return db;
}

module.exports = connectDatabase();
