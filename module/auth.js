const crypto = require('crypto');

const genPassword = (password) => {
    return crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
};

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
};

const checkAuthAdmin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/auth/login');
    }
    if (req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.render('error', { message: 'Nincs jogosultságod az oldal megtekintéséhez!', error: {} });
    }
};


module.exports = {
    genPassword,
    checkAuth,
    checkAuthAdmin
};
