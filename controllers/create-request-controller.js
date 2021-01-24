const express = require("express");
const Router = express.Router();
const db = require("../database")
const session = require('express-session');

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
    try {
    db.query('INSERT into supportrequests SET?', newRequest,(err) => {
        if (err) throw err,
        console.log("Database Updated.")
        });
        response.render('dashboard.ejs', { createmsg: "Request Submitted Successfully "});
    } catch (err) {
        console.log(err);
        response.render('dashboard.ejs', { createmsg: `There was an error with your request. Please try again.`});
    };  
};