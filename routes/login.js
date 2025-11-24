const express = require('express');
const router = express.Router();

const { query } = require('../module/db');
const { genPassword } = require('../module/auth');

router.get('/', (req, res, next) => {
    res.render('login', { user: null });
});

router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    const sql = `
        SELECT * FROM users
        WHERE username='${username}'
        AND hash='${genPassword(password)}'
    `;

    const users = await query(sql);
    if (users.length === 1) {
        req.session.user = users[0];
        res.redirect('/');
    } else {
        res.redirect('/auth/login');
    }

});

module.exports = router;
