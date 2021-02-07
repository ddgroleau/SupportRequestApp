const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require("express-session");

//Connection to MySQL Server/Databse
const db = mysql.createPool({
    connectionLimit : 1,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: process.env.CLEARDB_HOST,
    user: process.env.CLEARDB_USERNAME,
    port: process.env.PORT || 3306,
    password: process.env.CLEARDB_PASSWORD,
    database: process.env.CLEARDB_DATABASE,
    multipleStatements: true,
});

db.getConnection((err) =>{
if (!err) {
    console.log("...Connected to Database!")
} else{ 
console.log("...Connection to Database Failed!")
}
});

module.exports = db;