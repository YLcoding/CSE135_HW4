var createError = require('http-errors');
var express = require('express');
var methodOverride = require('method-override')
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var auth = require('./model/auth');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');
var userManagerRouter = require('./routes/userManager');
var reportRouter = require('./routes/report');

var app = express();
//link database
var mysql = require('mysql');
//Tries to connect 

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cse135",
  database : 'hw4'
});

con.connect(function(err) {
  if (err) {throw err};
  console.log("Connected!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use(session({ 
    secret: 'some-secret',
    saveUninitialized: false,
    resave: true
}));
// Tells app to use password session
app.use(auth.initialize());
app.use(auth.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/userManager', userManagerRouter);
app.use('/report', reportRouter);
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

app.post('/login',
  auth.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    if (req.user) {
      res.redirect('/profile');
    } else {
      res.redirect('/');
    }
  });

// index page
app.post('/api/log', (req, res) => {
	let reqData = {};
	if (typeof req.body === 'object') {
		reqData = req.body;
	}
	else {
		reqData = JSON.parse(JSON.parse(req.body));
	}
	
	const {sessionId} = reqData;
	const absoscreenHeight = reqData.absoscreenHeight;
	const absoscreenWidth = reqData.absoscreenWidth;
	const availscreenHeight = reqData.availscreenHeight;
	const availscreenWidth = reqData.availscreenWidth;
	const lang = reqData.lang;
	const path = reqData.path;
	const pixelDepth = reqData.pixelDepth;
	const timestamp = reqData.timestamp;
	const userAgent = reqData.userAgent;
	const os = reqData.os;
	const device = reqData.device;
	const browser = reqData.browser;
	const loadTime = reqData.loadTime;
	console.log(reqData);

	let sql = `INSERT INTO clientchar (sessionId, absoscreenHeight, absoscreenWidth, availscreenHeight, availscreenWidth, lang, path, pixelDepth, timestamp, userAgent, os , device, browser)
	VALUES( ?,? ,? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ?)`;
	let todos = [sessionId, absoscreenHeight, absoscreenWidth, availscreenHeight, availscreenWidth, lang, path, pixelDepth, timestamp, userAgent, os, device, browser ];
	if (todos.findIndex(function(element) {
			return element == null;
		}) > 0) {
		return;
	}
	con.query(sql, todos, function (error, results, fields) {
		if (error) throw error;
		sql = `INSERT INTO speed (sessionId,  path, timestamp, loadTime)
		VALUES( ? , ? , ? , ?)`;
		todos = [sessionId,path, timestamp, loadTime ];
		if (todos.findIndex(function(element) {
				return element == null;
			}) > 0) {
			return;
		}
		con.query(sql, todos, function (error, results, fields) {
			if (error) throw error;
			console.log('The result is: ', results);
			res.send(results);
		});
	});
});

app.post('/api/error', (req, res) => {
	let reqData = {};
	if (typeof req.body === 'object') {
		reqData = req.body;
	}
	else {
		reqData = JSON.parse(JSON.parse(req.body));
	}
	
	const sessionId = reqData.sessionId;
	const col = reqData.column;
	const line = reqData.line;
	const message = reqData.message;
	const path = reqData.path;
	const timestamp = reqData.timestamp;
	
	let sql = `INSERT INTO errors (sessionId, col, line, message, path, timestamp)
		VALUES( ?, ? , ? , ? , ?, ?)`;

	let todos = [sessionId, col, line, message, path, timestamp];
	if (todos.findIndex(function(element) {
			return element == null;
		}) > 0) {
		return;
	}
	con.query(sql, todos, function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results);
	  res.send(results);
	});
});




// Simulate 403
app.get('/403', (req, res) => {
    res.status(403);
    res.sendFile("/var/www/html/custom_403.html");
});
// Simulate 404
app.get('/404', (req, res) => {
    res.status(404);
    res.sendFile("/var/www/html/custom_404.html");
});
// Simulate 500
app.get('/500', (req, res) => {
    res.status(500);
    res.sendFile("/var/www/html/custom_50x.html");
});

// Handle 404
app.use(function(req, res) {
    res.status(404);
    res.sendFile("/var/www/html/custom_404.html");
});

// Handle 500
app.use(function(error, req, res, next) {
    res.status(500);
    res.sendFile("/var/www/html/custom_50x.html");
});

app.listen(8089, () => console.log('Listening on port 8089...'));

module.exports = app;
