const express = require("express");
const session = require("express-session");
const Router = express.Router();
const db = require("../database")
const profile = require("../controllers/profile-controller")

Router.get("/requests", profile.displayUserRequests);

Router.get("/analytics", profile.displayUserAnalytics);

Router.get("/", profile.displayUserProfile);

module.exports = Router