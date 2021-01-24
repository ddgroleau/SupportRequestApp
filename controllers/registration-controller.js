const express = require("express");
const Router = express.Router();
const db = require("../database")
const bcrypt = require('bcrypt');
const session = require('express-session');

// REGISTRATION CONTROLLER
exports.createUser = async (request,response) => {
    // Recieve and Process Registration Data
    const data = request.body;
    const username = data.username;
    const password = data.password;
    const email = data.email;
    // Hashes Password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    const profile = { username: username, email: email, password: hash};
    console.log(profile);
    console.log(password.search(/\d/))
    // Checks Password Requirements
    if (password.length < 8) {
        response.render('register.ejs', {message: "Password too short. Try again."});
    } else if (password.search(/\d/) == -1) {
        response.render('register.ejs', {message: "Password must contain a number. Try again."});
    } else if (password.search(/[A-Z]/) == -1) {
        response.render('register.ejs', {message: "Password must contain an uppercase letter. Try again."});
    } else if (password.search(/[a-z]/) == -1) {
        response.render('register.ejs', {message:"Password must contain a lowercase letter. Try again."});
    } 
    else {
    // Check database for username and password.
    db.query(`SELECT * FROM users WHERE email = "${email}"`, function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result != "" && result[0].username == username) {
            response.render('register.ejs', {message: "This username is already in use."});
        }  else if (result != "" && result[0].email == email) {
            response.render('register.ejs', {message: "This email is already in use."});
        } else {
                // Inserts New User into Users
                db.query('INSERT INTO users SET ?', profile, function(err) {
                    if (err) throw err;
                    console.log("Database Updated.")
                    });
            response.render("login.ejs");
        }
    }); 
};
};
