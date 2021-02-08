// --- MODULES/DEPENDENCIES ---
const express = require('express');
const dotenv = require('dotenv').config('.env');
const methodOverride = require('method-override');
const moment = require('moment');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const Router = express.Router();
const db = require("./database");
const bcrypt = require('bcrypt');
const session = require("express-session");
const flash = require("express-flash");
const { response, request } = require('express');
const MySQLStore = require('express-mysql-session')(session);
const ejs = require("ejs");
const users = require("./routes/users.js");
const registration= require('./routes/registration');
const login= require('./routes/login');
const dashboard= require('./routes/dashboard');
const logout= require('./routes/logout');
const createRequest= require('./routes/create-request');
const readRequests= require('./routes/read-request');
const currentUser= require('./routes/current-user');
const updateRequest= require("./routes/update");
const deleteRequest= require("./routes/delete");
const profile= require("./routes/profile");
const about= require("./routes/about");

// --- EXPRESS SETUP ---
const app = express();
const port = process.env.PORT || 3050
app.listen(port, () => console.log(`Server started at Port: ${port}`));
app.use(express.static(__dirname));
app.use(express.json({limit: '1mb'}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(flash());

// SESSION
const options = {
    host: process.env.CLEARDB_HOST,
    user: process.env.CLEARDB_USERNAME,
    
    password: process.env.CLEARDB_PASSWORD,
    database: process.env.CLEARDB_DATABASE,
    clearExpired: true,
    createDatabaseTable: true,
    charset: 'utf8mb4_bin',
	schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
    }
};
const sessionStore = new MySQLStore(options);
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'sign cookie',
    store: sessionStore,
    cookie: {
        maxAge: 36000000,
        sameSite: true,
        secure: false,
    },
}));

// ROUTES
app.use("/routes", users);
app.use("/routes", currentUser);
app.use("/routes", readRequests);
app.use("/", registration);
app.use("/", login)
app.use("/", dashboard)
app.use("/", about);
app.use("/", logout)
app.use("/", createRequest);
app.use("/", updateRequest);
app.use("/", deleteRequest);
app.use("/profile", profile);

// Error Handling 
app.use((request, response) => {
    const error = new Error('There was an issue. Please try again');
    error.status = 404;
    response.redirect('/dashboard');
});

app.use((error, request, response) => {
response.status(error.status || 500);
response.json({
    error: {
        message: error.message
    }
});
});











