const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require("express-session");

//Connection to MySQL Server/Databse
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'AH7my62y2k',
    database: 'supportrequestapp',
    multipleStatements: true,
});

db.connect((err) =>{
if (!err) {
    console.log("...Connected to Database!")
} else{ 
console.log("...Connection to Database Failed!")
}
});

module.exports = db;