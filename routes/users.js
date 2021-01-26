const express = require("express");
const Router = express.Router();
const db = require("../database")
const bcrypt = require('bcrypt');
const session = require('express-session');
const getUsers = require("../controllers/user-controller")


// GET * FROM USERS
Router.get("/users", getUsers.getUsers);

module.exports = Router;




