'use strict'

module.exports= executeQuery;

const mysql= require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'Enzuccio1?',
    database:'shops'
});
 
function executeQuery (sql,params,callback) {
    connection.connect(function err(){
        if(err){
            console.log(err+"errore");
        }
        else{
            console.log("connected");
        }
    });
    
    connection.query(sql,params,callback);
   // connection.end();

}