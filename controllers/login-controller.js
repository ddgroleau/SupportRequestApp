const express = require("express");
const Router = express.Router();
const db = require("../database")
const bcrypt = require('bcrypt');
const session = require('express-session');

// LOGIN CONTROLLER
exports.authLogin = async (request, response) => {
    // Recieve and Process Registration Data
    const data = request.body;
    const username = data.username;
    const password = data.password;
    // Conduct Database Query
    db.query(`SELECT * FROM users WHERE username = "${username}"`, function (err, result) {
        if (err) throw (err);
    if (result != "" && bcrypt.compareSync(password, result[0].password) == true) {
        request.session.loggedin = true;
        request.session.username = username;
        console.log("New Session Started.")
        response.redirect("/dashboard")
    } else {
    response.render("login.ejs", {message:"Your email address or password is wrong. Please try again"});
    }
});
};

