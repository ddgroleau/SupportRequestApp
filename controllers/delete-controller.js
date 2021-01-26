const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

exports.deleteQueueLine = async (request, response) => {
    const id = await request.body.id;
    db.query(`DELETE FROM supportrequests WHERE id = "${id}"`, (err, result) => {
        if (err) throw err;
        response.send("deleted");
    });
};