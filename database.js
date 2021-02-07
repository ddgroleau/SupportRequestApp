const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require("express-session");

//Connection to MySQL Server/Databse
const db = mysql.createConnection({
    host: process.env.CLEARDB_HOST,
    user: process.env.CLEARDB_USERNAME,
    port: process.env.PORT || 3306,
    password: process.env.CLEARDB_PASSWORD,
    database: process.env.CLEARDB_DATABASE,
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