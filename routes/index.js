var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.user) {
    let loggedin = true;
    res.render('index', { title: 'CSE 135', loggedin });
  } else {
    let loggedin = false;
    res.render('index', { title: 'CSE 135', loggedin });
  }
});

module.exports = router;
