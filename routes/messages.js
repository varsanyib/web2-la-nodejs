var express = require('express');
var router = express.Router();

const { query } = require('../module/db');

router.get('/', async (req, res) => {
  const user = req.session.user;
  let messages;
  if (user && user.isAdmin) {
    messages = await query('SELECT messages.*, users.username FROM messages LEFT JOIN users ON users.id = messages.user_id ORDER BY created_at DESC;');
  } else if (user) {
    messages = await query(`SELECT messages.*, users.username FROM messages LEFT JOIN users ON users.id = messages.user_id WHERE messages.user_id = ${user.id} ORDER BY created_at DESC;`);
  } else {
    messages = [];
  }
  res.render('messages', { user, messages });
});


module.exports = router;
