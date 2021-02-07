const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');
const flash = require('express-flash')

exports.createRequest = async (request, response) => {
    const data = await request.body;
    const id = data.id;
    const type = data.type;
    const creationDate = data.creationdate;
    const category = data.category;
    const requestSummary = data.requestsummary;
    const dueDate = data.duedate;
    const comments = data.comments;
    const status = data.status;
    const assignedTo = data.assignedto;
    const createdBy = data.createdby;
    const newRequest = {
        id: id,
        type: type,
        creationdate: creationDate,
        category: category,
        requestsummary: requestSummary,
        duedate: dueDate,
        comments: comments,
        status: status,
        assignedto: assignedTo,
        createdby: createdBy,
    };
    if (newRequest.type == "default" || newRequest.category == "default" || newRequest.assignedto == "default") {
        response.render("dashboard.ejs", {alertmsg: "Looks like there was an error. Please check your entries and try again."});
        console.log("Form Entry Error")
    } else {
        db.query('INSERT into supportrequests SET?', newRequest, async (err) => {
        if (err)  {
        response.render("dashboard.ejs", {alertmsg: "Looks like there was an error. Please check your entries and try again."});
        } else {
            console.log(`Entry added to database: ${newRequest.id}`)
        response.redirect("/dashboard");
        }
        });
    };
};


