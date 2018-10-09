const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router()
function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      // TODO create user
      req.login(req.body, () => {
        res.redirect('/auth/profile');
      });
      res.json(req.body);
    });
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;