const { request } = require("express");
const express = require("express");
const Router = express.Router();
const db = require("../database")
const deleteController = require('../controllers/delete-controller');

Router.post("/delete", deleteController.deleteQueueLine);

module.exports = Router;