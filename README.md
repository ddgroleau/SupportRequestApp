# The Support Request Application

Managing requests that flow into your email inbox can be difficult at a high volume. 
Project requirements or important events can be lost or forgotten as the emails pile up.
This project was designed to create an environment in which co-workers and collaborators could request support, 
organize project requirements, and complete tasks together in a visual manner, 
without having to manage hundreds of emails in their inbox.


### Prerequisites

You will need to download Node.js, which can be found at https://www.npmjs.com/get-npm.
To check if you have Node.js installed, run this command in your terminal:

```
node -v
```
To confirm that you have npm installed you can run this command in your terminal:
```
npm -v
```

You will also need MySQL Server and Workbench, available at https://dev.mysql.com/downloads/. 
First time with MySQL? Here is a link to installation and setup instructions: https://dev.mysql.com/doc/workbench/en/wb-installing.html.
Once you have MySQL Server and Workbench installed on your machine, run the below queries to get your Support Request Database up and running.
```
CREATE DATABASE supportrequestapp;
```
```
CREATE TABLE `supportrequestapp`.`supportrequests` (id VARCHAR(45) PRIMARY KEY, type VARCHAR(45) NOT NULL, category VARCHAR(45) NOT NULL, 
creationdate DATE NOT NULL, requestsummary VARCHAR(200) NOT NULL, duedate DATE NOT NULL, 
comments VARCHAR(2500) NOT NULL,status VARCHAR(45) NOT NULL, assignedto VARCHAR(45) NOT NULL,
 createdby VARCHAR(45) NOT NULL
);
```
```
CREATE TABLE `supportrequestapp`.`users` (username VARCHAR(100) PRIMARY KEY NOT NULL, 
email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL
);
```

## Deployment

Planned deployment via one of the following: Heroku/Azure/Glitch/repl.it

## Built With

* HTML5, CSS, JavaScript 
* Node.js, Express, SQL 
* MySQL for Database/Database Management
* Bcrypt and Express-Session for log-on, authentication and password hashing


## Authors

* **Dan Groleau** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Pixabay.com for the cool database logo
* Youtube.com/CodingTrain 
* CodeAcademy