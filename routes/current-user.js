const express = require("express");
const session = require("express-session");
const Router = express.Router();
const db = require("../database")
const currentUser = require("../controllers/current-user-controller")


Router.get("/currentUser", currentUser.getCurrentUser);

Router.get("/currentUser:requests", async (request, response) => {
    if (request.session.loggedin) {
 response.render('user-requests.ejs')
    } else {
        response.render('login.ejs', {message:'Please login.'});
    }
});

module.exports = Router