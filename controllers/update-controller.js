const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

exports.updateComments = async (request, response) => {
    const data = await request.body
    const id = data.updateid;
    const comments = request.body.updatecomments;
    db.query(`UPDATE supportrequests SET comments = "${comments}" WHERE id = "${id}"`, (err, result) => {
    if (err) throw err;
    console.log("Update Success");
    });
    response.redirect("/dashboard")
};

exports.updateStatusResolved = async (request, response) => {
    console.log(request.body);
    const data = await request.body;
    const id = data.id;
    const resolved = "Resolved";
    db.query(`UPDATE supportrequests SET status = "${resolved}" WHERE id = "${id}"`, (err, result) => {
    if (err) throw err;
    response.send("resolved");
    });
};

exports.updateStatusRejected = async (request, response) => {
    console.log(request.body);
    const data = await request.body;
    const id = data.id;
    const rejected = "Rejected";
    db.query(`UPDATE supportrequests SET status = "${rejected}" WHERE id = "${id}"`, (err, result) => {
    if (err) throw err;
    response.send("rejected");
    });
};