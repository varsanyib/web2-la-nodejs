var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login', { user: null, error: null });
});

router.get('/register', function(req, res, next) {
  res.render('register', { user: null, error: null });
});

module.exports = router;
