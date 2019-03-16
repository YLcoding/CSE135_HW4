var express = require('express');
var router = express.Router();
var sql = require('../model/db');

/* get all reports */
router.get('/', function (req, res, next) {
	if (!req.user) {
	  return res.redirect('/login');
	} else if (!req.user.admin) {
	  return res.redirect('/profile');
	}
	res.send("Welcome to report page.");
});

/* Browser Report */
router.get('/browser', function (req, res, next) {
	if (!req.user) {
	  return res.redirect('/login');
	} else if (!req.user.browserReport) {
	  return res.redirect('/profile');
	}
	sql.query("SELECT * FROM clientchar", function (err, results) {
		if (err) {
			console.log("error: ", err);
			res.status(400).send('Error in database operation');
		}
		else {
			res.render('browserreport', { title: 'Browser Report', results});
		}
	});
});

/* Performance Report */
router.get('/performance', function (req, res, next) {
	if (!req.user) {
	  return res.redirect('/login');
	} else if (!req.user.performanceReport) {
	  return res.redirect('/profile');
	}
	sql.query("SELECT * FROM speed", function (err, results) {
		if (err) {
			console.log("error: ", err);
			res.status(400).send('Error in database operation');
		}
		else {
			res.render('performancereport', { title: 'Performance Report', results});
		}
	});
});

/* Device Report */
router.get('/device', function (req, res, next) {
	if (!req.user) {
	  return res.redirect('/login');
	} else if (!req.user.deviceReport) {
	  return res.redirect('/profile');
	}
	sql.query("SELECT * FROM clientchar", function (err, results) {
		if (err) {
			console.log("error: ", err);
			res.status(400).send('Error in database operation');
		}
		else {
			res.render('devicereport', { title: 'Device Report', results});
		}
	});
});

/* Display Report */
router.get('/display', function (req, res, next) {
	if (!req.user) {
	  return res.redirect('/login');
	} else if (!req.user.displayReport) {
	  return res.redirect('/profile');
	}
	sql.query("SELECT * FROM clientchar", function (err, results) {
		if (err) {
			console.log("error: ", err);
			res.status(400).send('Error in database operation');
		}
		else {
			res.render('displayreport', { title: 'Display Report', results});
		}
	});
});

/* Error Report */
router.get('/error', function (req, res, next) {
	if (!req.user) {
	  return res.redirect('/login');
	} else if (!req.user.errorReport) {
	  return res.redirect('/profile');
	}
	let alldata = {};
	sql.query("SELECT * FROM errors", function (err, results) {
		if (err) {
			console.log("error: ", err);
			res.status(400).send('Error in database operation');
		}
		else {
			alldata['error'] = results;
			sql.query("SELECT * FROM clientchar", function (err, results) {
				if (err) {
					console.log("error: ", err);
					res.status(400).send('Error in database operation');
				}
				else {
					results.push(alldata['error']);
					res.render('errorreport', { title: 'Error Report', results});
				}
			});
		}
	});
});

module.exports = router;
