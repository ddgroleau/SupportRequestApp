const express = require("express");
const Router = express.Router();
const db = require("../database")
const createRequestController = require("../controllers/create-request-controller");

Router.get("/requests", (request, response) => {
    db.query("SELECT * from supportrequests", (err, rows, fields) => {
        if (!err) {
            response.send(rows);
        } else {
            response.send("Error, No data")
        }
    })
});

module.exports = Router