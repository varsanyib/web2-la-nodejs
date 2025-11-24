const express = require('express');
const router = express.Router();

const { query } = require('../module/db');
const { genPassword } = require('../module/auth');

router.get('/', (req, res, next) => {
    res.render('register', { title: 'Register' });
});

router.post('/', async (req, res, next) => {
    const { username, password, fullname } = req.body;
    const sql = `
        INSERT INTO users (username, hash, name, isAdmin)
        VALUES ('${username}', '${genPassword(password)}', '${fullname}', 0)`;
    await query(sql);

    res.redirect('/');
});

module.exports = router;
