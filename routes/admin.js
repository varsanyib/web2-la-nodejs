var express = require('express');
var router = express.Router();

const {query} = require('../module/db');

router.get('/', async function(req, res, next) {
    const users = await query('SELECT id, name, username, isAdmin, createdAt, modifiedAt FROM users;');

    res.render('admin', { users, user: req.session.user});
});

module.exports = router;
