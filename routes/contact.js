var express = require('express');
var router = express.Router();

const { query } = require('../module/db');

router.get('/', async function(req, res, next) {
    res.render('contact', { user: req.session.user || null, success: false });
});

router.post('/', async function(req, res, next) {
    const { username, name, subject, message, userId } = req.body;

    await query(`INSERT INTO messages (name, subject, body, user_id) VALUES ('${name}', '${subject}', '${message}', ${userId})`);
    res.render('contact', { user: req.session.user || null, success: true });
});

module.exports = router;
