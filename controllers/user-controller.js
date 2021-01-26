const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

exports.getUsers = (req, res)=> {
    db.query("SELECT * from users", (err, rows) => {
        if (err) throw err;
        let users = [];
       for (user in rows) {
           users.push({ 
               username: rows[user].username 
           });
       };
   res.send(users);
    })
   };