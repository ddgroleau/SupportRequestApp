const express = require("express");
const Router = express.Router();
const db = require("../database")
const bcrypt = require('bcrypt');
const session = require('express-session');
const registrationController = require('../controllers/registration-controller')

// REGISTRATION
Router.get("/register", (request, response) => {
    response.render('register.ejs');
});
Router.post("/register", registrationController.createUser);

module.exports = Router;