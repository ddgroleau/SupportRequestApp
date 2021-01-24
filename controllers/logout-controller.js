const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

// LOGOUT
exports.logOut = async (request, response) => {
    request.session.destroy();
    console.log("Session Ended.")
    response.redirect('/');
};