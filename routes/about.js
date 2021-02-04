const express = require("express");
const Router = express.Router();
const db = require("../database")
const aboutController = require('../controllers/about-controller');

// HOW-TO
Router.get('/about', aboutController.about);

module.exports = Router