const express = require("express");
const Router = express.Router();
const db = require("../database")
const bcrypt = require('bcrypt');
const session = require('express-session');
const loginController = require("../controllers/login-controller");
const logoutController = require("../controllers/logout-controller");

// LOGOUT
Router.get("/logout", logoutController.logOut);

module.exports = Router;