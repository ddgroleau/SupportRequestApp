const express = require("express");
const Router = express.Router();
const db = require("../database")
const updateController = require("../controllers/update-controller");

Router.put("/update/:comments", updateController.updateComments);

Router.post("/update/status:resolved", updateController.updateStatusResolved);

module.exports = Router;