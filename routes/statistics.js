var express = require('express');
var router = express.Router();

const { query } = require('../module/db');

router.get('/', async (req, res) => {
  const radios = await query('SELECT COUNT(*) AS db FROM radios');
  const count = radios[0]['db'] || 0;

  const lastCreatedAt = await query('SELECT * FROM radios ORDER BY created_at DESC LIMIT 1');
  const newest = lastCreatedAt[0] || null;
  res.render('statistics', { count, newest, user: req.session.user });
});

module.exports = router;
