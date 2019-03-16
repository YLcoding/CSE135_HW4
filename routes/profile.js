var express = require('express');
var router = express.Router();
var sql = require('../model/db');

/* GET profile page. */
router.get('/', function(req, res, next) {
   if (!req.user) {
      return res.redirect('/login');
   }
   sql.query("SELECT * FROM users WHERE username='" + req.user.username + "';", function (err, results) {
      if (err) {
         console.log("error: ", err);
         res.status(400).send('Error in database operation');
      }
      else {
         res.render('profile', { title: 'Profile Page', results });
      }
   });
});

module.exports = router;
