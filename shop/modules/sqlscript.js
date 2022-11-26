'use strict'

module.exports= executeQuery;

const mysql= require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'prova',
    password:'Enzuccio1?',
    database:'prova'

});
 
function executeQuery (sql, callback) {
    connection.connect();
    connection.query(sql,callback);
    connection.end();
}