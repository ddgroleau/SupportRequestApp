const express = require("express");
const Router = express.Router();
const db = require("../database")
const bcrypt = require('bcrypt');
const session = require('express-session');

exports.onLogin= async (request, response) => {
    if (request.session.loggedin) {
 response.render('dashboard.ejs', {message: request.session.username})
    } else {
        response.render('login.ejs', {message:'Please login.'});
    }
};