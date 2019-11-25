const express = require('express');
//const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const port = 1212;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
	host: "localhost:3306",
	user: "nmcxiawb_nmcx",
	password: "Admin@32",
	database: "nmcxiawb_socka"
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
//app.use(fileUpload()); // configure fileupload

// routes for the app
const {getHomePage} = require('./routes/index');
const {getSoct, reSoct, viewSoct, expSoct, runABC} = require('./routes/soct');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');

app.get('/', getHomePage);
app.get('/soct', getSoct);
app.get('/resoct', reSoct);
app.get('/expSoct/:commodity', expSoct);
app.get('/viewSoct/:identifier', viewSoct);
app.get('/runABC/:identifier', runABC);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


//https://dev.to/achowba/build-a-simple-app-using-node-js-and-mysql-19me
//for session
//https://codeforgeek.com/manage-session-using-node-js-express-4/
//khajana
//https://www.codementor.io/mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3
//Errors
//https://webapplog.com/error-handling-and-running-an-express-js-app/

/* HELP
for initiate project run follows command on terminal
npm init																				//npm initialization
npm install express express-fileupload body-parser mysql ejs req-flash --save			
npm install nodemon -g																	//install the last module globally on your PC
npm install --save express express-session body-parser									//For session

https://cmsdk.com/node-js/nodejs-websocket-use-variable-in-html-with-express.html
*/