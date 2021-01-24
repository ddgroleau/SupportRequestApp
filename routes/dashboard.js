const express = require("express");
const Router = express.Router();
const db = require("../database")
const dashboardController = require('../controllers/dashboard-controller');

// DASHBOARD
Router.get('/dashboard', dashboardController.onLogin);

module.exports = Router