const { request } = require("express");
const express = require("express");
const Router = express.Router();
const db = require("../database")

Router.post("/delete", async (request, response) => {
    const id = await request.body.id;
    db.query(`DELETE FROM supportrequests WHERE id = "${id}"`, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
    response.send("deleted");
});

module.exports = Router;