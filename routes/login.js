var express = require('express');
var router = express.Router();

/* get login page */
router.get('/', function(req, res, next) {
   if (req.user) {
      return res.redirect('/profile');
   } else {
      return res.render('login', { title: 'Login Page' });
   }
});

module.exports = router;
