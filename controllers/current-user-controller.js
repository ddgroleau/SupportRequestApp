const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

exports.getCurrentUser = (request, response) => {
    db.query(`SELECT * FROM users WHERE username = "${request.session.username}"`, (err, result) => {
        if (err) throw err;
        response.send({
            username: result[0].username,
            email: result[0].email,
        });
    });
};