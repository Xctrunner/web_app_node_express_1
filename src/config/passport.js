const passport = require('passport');
require('./strategies/local.strategy');

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // stores user in session
  passport.serializeUser((user, done) => {
    // should maybe actually handle errors, only pass in user.id
    done(null, user)
  });

  // retrieves user from session
  passport.deserializeUser((user, done) => {
    // should maybe actually handle errors
    // if we were using user.id above, we would then need to find user by ID
    done(null, user)
  });

};
