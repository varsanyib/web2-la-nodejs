var express = require('express');
var router = express.Router();
const { query } = require('../module/db');

router.get('/', async function(req, res, next) {
    // get radio stations from database

    const radios = await query(`SELECT * FROM radios`);
    res.render('radios', { user: req.session.user, radios: radios });
});

router.get('/view/:id', async function(req, res, next) {
    const radioId = req.params.id;
    const radio = await query(`SELECT radios.*, towns.county_name, counties.region FROM radios INNER JOIN towns ON towns.name = radios.town_name INNER JOIN counties ON counties.name = towns.county_name WHERE radios.id = ${radioId};`);
    if (radio.length === 0) {
        return res.status(404).send('Radio station not found');
    }
    res.render('radio_view', { user: req.session.user, radio: radio[0] });
});

router.get('/create', async function(req, res, next) {
    const towns = await query(`SELECT * FROM towns;`);
    res.render('radio_create', { user: req.session.user, towns: towns });
});

router.post('/create', async function(req, res, next) {
    const { name, town_name, frequency, power, address } = req.body;
    await query(`INSERT INTO radios (name, town_name, frequency, power, address) VALUES ('${name}', '${town_name}', ${frequency}, ${power}, '${address}')`);
    res.redirect('/radios');
});

router.get('/edit/:id', async function(req, res, next) {
    const radioId = req.params.id;
    const radio = await query(`SELECT * FROM radios WHERE id = ${radioId};`);
    if (radio.length === 0) {
        return res.status(404).send('Radio station not found');
    }
    const towns = await query(`SELECT * FROM towns;`);
    res.render('radio_edit', { user: req.session.user, radio: radio[0], towns: towns });
});
router.post('/edit/:id', async function(req, res, next) {
    const radioId = req.params.id;
    const { name, town_name, frequency, power, address } = req.body;
    await query(`UPDATE radios SET name = '${name}', town_name = '${town_name}', frequency = ${frequency}, power = ${power}, address = '${address}' WHERE id = ${radioId}`);
    res.redirect('/radios');
});

router.get('/delete/:id', async function(req, res, next) {
    const radioId = req.params.id;
    await query(`DELETE FROM radios WHERE id = ${radioId}`);
    res.redirect('/radios');
});
module.exports = router;
