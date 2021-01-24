const express = require("express");
const Router = express.Router();
const db = require("../database")
const bcrypt = require('bcrypt');
const session = require('express-session');


// GET * FROM USERS
Router.get("/users", (req, res)=> {
 db.query("SELECT * from users", (err, rows, fields) => {
     if (!err) {
         res.send(rows);
     } else {
     console.log(err);
     }
 })
});

module.exports = Router;




