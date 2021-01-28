const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');
const bcrypt= require("bcrypt");

exports.getCurrentUser = (request, response) => {
    db.query(`SELECT * FROM users WHERE username = "${request.session.username}"`, (err, result) => {
        if (err) throw err;
        response.send({
            username: result[0].username,
            email: result[0].email,
        });
    });
};

exports.changePassword = async (request, response) => {
    const currentUser = request.session.username;    
    const newPassword =  request.body.password;
    // Hashes Password
    const saltRounds = 10;
    const hash = bcrypt.hashSync(newPassword, saltRounds);
    const profile = { username: currentUser, password: hash};
    // Checks Password Requirements
    if (newPassword.length < 8) {
        response.send( {serverAlert: "Password too short. Try again."});
    } else if (newPassword.search(/\d/) == -1) {
        response.send( {serverAlert: "Password must contain a number. Try again."});
    } else if (newPassword.search(/[A-Z]/) == -1) {
        response.send( {serverAlert: "Password must contain an uppercase letter. Try again."});
    } else if (newPassword.search(/[a-z]/) == -1) {
        response.send( {serverAlert:"Password must contain a lowercase letter. Try again."});
    } else { 
        db.query(`UPDATE users SET username = "${currentUser}" WHERE password = "${hash}"`, (err, result) => {
            if (err) throw err;
            console.log("User password updated.")
            response.send({serverAlert: "Password changed successfully."});
            });
        };
    };