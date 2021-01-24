const express = require("express");
const Router = express.Router();
const db = require("../database")
const createRequestController = require("../controllers/create-request-controller");

Router.post("/createRequest", createRequestController.createRequest);

module.exports = Router