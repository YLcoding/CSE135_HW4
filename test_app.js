const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
var builder = require('xmlbuilder');
var cookieParser = require('cookie-parser');
var _ = require('underscore');
var favicon = require('serve-favicon');
var path = require('path');
var uuid = require('uuid');
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(express.static('/var/www/html/hw4_testPages'))

// app.use(cookieSession({
//     name: 'SESIONID',
//     secret: 'cse135thomas',
  
//     // Cookie Options
//     maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     httpOnly: false
// }))

/* use uuid */
app.use(function(req, res, next) {
    if(!req.cookies.SESIONID) {
        res.cookie('SESIONID', uuid.v4());
    }
	next();
});

// index page
app.get('/', (req, res) => {
    res.set({
        'Server': 'Node.js',
        'X-Powered-By': 'Thomas'
    });
    // req.session.someVal = "Hello World";
    res.sendFile("/var/www/html/hw4_testPages/home.html");
});

// images page
app.get('/images', (req, res) => {
    res.sendFile("/var/www/html/hw4_testPages/images.html");
})

// error page
app.get('/error', (req, res) => {
    res.sendFile("/var/www/html/hw4_testPages/error.html");
})

// event page
app.get('/event', (req, res) => {
    res.sendFile("/var/www/html/hw4_testPages/event.html");
})

// HW2 Q7 REST Test
app.get('/user', (req, res) => {
    // display all users
    let usersJson = require("./users.json");
    res.json(usersJson);
});
app.get('/user/:login', (req, res) => {
    // if given login, display user
    const login = req.params.login;
    let usersJson = require("./users.json");
    let user = _.where(usersJson, {login});
    if (user === undefined || user.length == 0) {
        res.send("User does not exist.");
    } else {
        res.json(_.where(usersJson, {login}));
    }
});
app.post('/user', (req, res) => {
    // create user
    let usersJson = require("./users.json");
    const { body } = req;
    const { fullname, login, admin } = body;
    usersJson.push({
        fullname,
        login,
        admin
    });
    fs.writeFile('./users.json', JSON.stringify( usersJson ), "utf8", (err) => {
        if (err) throw err;
        console.log('Created user in users.json');
    });
});
app.put('/user/:login', (req, res) => {
    // update user
    const login = req.params.login;
    let usersJson = require("./users.json");
    const { body } = req;
    const { fullname, admin } = body;
    let updatedUser = {
        fullname,
        login,
        admin
    };
    _.extend(_.findWhere(usersJson, { login }), updatedUser);

    fs.writeFile('./users.json', JSON.stringify( usersJson ), "utf8", (err) => {
        if (err) throw err;
        console.log('Updated user in users.json');
    });
});
app.delete('/user/:login', (req, res) => {
    // delete user
    const login = req.params.login;
    let usersJson = require("./users.json");
    usersJson.splice(_.indexOf(usersJson, _.findWhere(usersJson, { login })), 1);

    fs.writeFile('./users.json', JSON.stringify( usersJson ), "utf8", (err) => {
        if (err) throw err;
        console.log('Deleted user in users.json');
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

app.listen(8090, () => console.log('Listening on port 8090...'));
