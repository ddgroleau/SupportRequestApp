const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

exports.displayUserRequests = async (request, response) => {
    if (request.session.loggedin) {
 response.render('user-requests.ejs', {message: request.session.username})
    } else {
        response.redirect('/');
    };
};

exports.displayUserAnalytics = async (request, response) => {
    if (request.session.loggedin) {
 response.render('user-analytics.ejs', {message: request.session.username})
    } else {
        response.redirect('/');
    }
};

exports.displayUserProfile = async (request, response) => {
    if (request.session.loggedin) {
 response.render('user-profile.ejs', {message: request.session.username})
    } else {
        response.redirect('/');
    }
}