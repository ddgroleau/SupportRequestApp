const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

exports.about= async (request, response) => {
    if (request.session.loggedin) {
 response.render('about.ejs')
    } else {
        response.redirect('/');
    }
};