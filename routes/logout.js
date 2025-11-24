const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('error', { message: 'Hiba történt a kijelentkezés során!', error: {} });
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});
module.exports = router;
