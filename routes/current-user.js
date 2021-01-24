const express = require("express");
const session = require("express-session");
const Router = express.Router();
const db = require("../database")


Router.get("/currentUser", (request, response) => {
    db.query(`SELECT * FROM users WHERE username = "${request.session.username}"`, (err, result) => {
        if (err) throw err;
        response.send({
            username: result[0].username,
            email: result[0].email,
        });
    });
});

module.exports = Router