const express = require("express");
const session = require("express-session");
const Router = express.Router();
const db = require("../database")
const currentUser = require("../controllers/current-user-controller")


Router.get("/currentUser", currentUser.getCurrentUser);

module.exports = Router