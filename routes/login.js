const express = require("express");
const Router = express.Router();
const db = require("../database")
const bcrypt = require('bcrypt');
const session = require('express-session');
const loginController = require("../controllers/login-controller");

// LOGIN 
Router.post("/login", loginController.authLogin);
Router.get("/", (request, response) => {
    response.render('login.ejs');
});

module.exports = Router;