//MySQL Password: AH7my62y2k

// --- MODULES/DEPENDENCIES ---
const express = require('express');
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
const requests= require('./routes/read-request');
const currentUser= require('./routes/current-user');

// --- EXPRESS SETUP ---
const app = express();
app.listen(3050, () => console.log("Server started at Port: 3050"));
app.use(express.static(__dirname));
app.use(express.json({limit: '1mb'}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// SESSION
const options = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'AH7my62y2k',
    database: 'supportrequestapp',
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
app.use("/routes", requests);
app.use("/", registration);
app.use("/", login)
app.use("/", dashboard)
app.use("/", logout)
app.use("/", createRequest);









