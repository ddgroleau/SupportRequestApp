const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

exports.updateComments = async (request, response) => {
    const data = request.body
    const id = request.body.updateid;
    const comments = request.body.updatecomments;
    db.query(`UPDATE supportrequests SET comments = "${comments}" WHERE id = "${id}"`, (err, result) => {
    if (err) throw err;
    console.log("Update Success");
    });
    response.render("dashboard.ejs")
    };