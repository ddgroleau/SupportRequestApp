const express = require("express");
const session = require("express-session");
const Router = express.Router();
const db = require("../database")

Router.get("/requests", async (request, response) => {
    if (request.session.loggedin) {
 response.render('user-requests.ejs', {message: request.session.username})
    } else {
        response.redirect('/');
    }
});

Router.get("/analytics", async (request, response) => {
    if (request.session.loggedin) {
 response.render('user-analytics.ejs', {message: request.session.username})
    } else {
        response.redirect('/');
    }
});

Router.get("/", async (request, response) => {
    if (request.session.loggedin) {
 response.render('user-profile.ejs', {message: request.session.username})
    } else {
        response.redirect('/');
    }
});

module.exports = Router