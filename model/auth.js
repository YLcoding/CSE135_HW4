var passport = require('passport')
   , LocalStrategy = require('passport-local').Strategy;
var sql = require('./db'); 

passport.use(new LocalStrategy(
   function (username, password, done) {
      var q = "SELECT * FROM users WHERE username = '" + username + "' AND password = MD5('" + password + "')";
      sql.query(q, function (err, results) {
         if (err) {
            console.log("error: ", err);
         }
         else {
            if (results.length > 0) {
               return done(null, results[0]);
            } else {
               done(null, false, { message: 'Invalid username and password.' });
            }
         }
      });
   }
));

// Required for storing user info into session 
passport.serializeUser(function (user, done) {
   done(null, user);
});

// Required for retrieving user from session
passport.deserializeUser(function (user, done) {
   // The user should be queried against db
   // using the id
   done(null, user);
});

module.exports = passport;