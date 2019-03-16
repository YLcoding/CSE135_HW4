var express = require('express');
var router = express.Router();
var sql = require('../model/db');

/* get all users */
router.get('/', function (req, res, next) {
   if (!req.user) {
      return res.redirect('/login');
   } else if (!req.user.admin) {
      return res.redirect('/profile');
   }

   let curUser = req.user;

   sql.query("SELECT * FROM users", function (err, results) {
      if (err) {
         console.log("error: ", err);
         res.status(400).send('Error in database operation');
      }
      else {
         // console.log('results : ', results);
         var todos = ["username", "password", "firstName", "lastName", "admin", "browserReport", "performanceReport", "deviceReport", "displayReport", "errorReport"];
         res.render('userManager', { title: 'User Manager', todos, results, curUser });
      }
   });
});

/* get one user */
router.get('/:username', function (req, res, next) {
   if (!req.user) {
      return res.redirect('/login');
   } else if (!req.user.admin) {
      return res.redirect('/profile');
   }

   let curUser = req.user.username;

   sql.query("SELECT * FROM users WHERE username='" + req.params.username + "';", function (err, results) {
      if (err) {
         console.log("error: ", err);
         res.status(400).send('Error in database operation');
      }
      else {
         // console.log('results : ', results);
         var todos = ["username", "password", "firstName", "lastName", "admin", "browserReport", "performanceReport", "deviceReport", "displayReport", "errorReport"];
         res.render('userManager', { title: 'User Manager', todos, results, curUser });
      }
   });
});

/* add user */
router.post('/', function (req, res, next) {
   const { body } = req;
   var {
      username,
      password,
      firstName,
      lastName,
      admin,
      browserReport,
      performanceReport,
      deviceReport,
      displayReport,
      errorReport
   } = body;

   if (admin === "true") {
      admin = 1;
   } else {
      admin = 0;
   }

   if (browserReport === "true") {
      browserReport = 1;
   } else {
      browserReport = 0;
   }

   if (performanceReport === "true") {
      performanceReport = 1;
   } else {
      performanceReport = 0;
   }

   if (deviceReport === "true") {
      deviceReport = 1;
   } else {
      deviceReport = 0;
   }

   if (displayReport === "true") {
      displayReport = 1;
   } else {
      displayReport = 0;
   }

   if (errorReport === "true") {
      errorReport = 1;
   } else {
      errorReport = 0;
   }

   var q = "INSERT INTO users (username, password, firstName, lastName, admin, browserReport, performanceReport, deviceReport, displayReport, errorReport) VALUES ('" + username + "', MD5('" + password + "'), '" + firstName + "', '" + lastName + "', " + admin + ", " + browserReport + ", " + performanceReport + ", " + deviceReport + ", " + displayReport + ", " + errorReport + ")";
   sql.query(q, function (err, results) {
      if (err) {
         console.log("error: ", err);
         res.status(400).send('Error in database operation');
      }
      else {
         // console.log('results : ', results);
         res.redirect('/userManager');
      }
   });
});

/* update user */
router.put('/:username', function (req, res, next) {
   const { body } = req;
   var {
      username,
      password,
      firstName,
      lastName,
      admin,
      browserReport,
      performanceReport,
      deviceReport,
      displayReport,
      errorReport
   } = body;

   if (admin === "true") {
      admin = 1;
   } else {
      admin = 0;
   }

   if (browserReport === "true") {
      browserReport = 1;
   } else {
      browserReport = 0;
   }

   if (performanceReport === "true") {
      performanceReport = 1;
   } else {
      performanceReport = 0;
   }

   if (deviceReport === "true") {
      deviceReport = 1;
   } else {
      deviceReport = 0;
   }

   if (displayReport === "true") {
      displayReport = 1;
   } else {
      displayReport = 0;
   }

   if (errorReport === "true") {
      errorReport = 1;
   } else {
      errorReport = 0;
   }

   var q = "UPDATE users SET username='" + username + "', password=MD5('" + password + "'), firstName='" + firstName + "', lastName='" + lastName + "', admin=" + admin + ", browserReport=" + browserReport + ", performanceReport=" + performanceReport + ", deviceReport=" + deviceReport + ", displayReport=" + displayReport + ", errorReport=" + errorReport + " WHERE username = '" + req.params.username + "';";
   sql.query(q, function (err, results) {
      if (err) {
         console.log("error: ", err);
         res.status(400).send('Error in database operation');
      }
      else {
         // console.log('results : ', results);
         res.redirect('/userManager');
      }
   });
});

/* delete user */
router.delete('/:username', function (req, res, next) {
   var q = "DELETE FROM users WHERE username = '" + req.params.username + "';";
   sql.query(q, function (err, results) {
      if (err) {
         console.log("error: ", err);
         res.status(400).send('Error in database operation');
      }
      else {
         // console.log('results : ', results);
         res.redirect('/userManager');
      }
   });
});

module.exports = router;
