const express = require('express');
require('dotenv').config();
const router = express.Router();
const path = process.env.__PATH;
const app = express();

app.set('view engine', 'ejs');

router.get('/', (req, res) => {
    res.render(path + '/views/spellViews/spells-home-page.ejs');
})

router.get('/schools', (req, res) => {
    res.render(path + '/views/spellViews/spells-by-school.ejs');
});

router.get('/schools:school', (req, res) => {
    let school = req.params.school.substring(1);
    res.render(path + '/views/spellViews/spells-school-page.ejs', {school: school});
});

router.get('/levels', (req, res) => {
    res.render(path + '/views/spellViews/spells-by-level.ejs');
});

router.get('/levels:level', (req, res) => {
    let level = req.params.level.substring(1);
    res.render(path + '/views/spellViews/spells-level-page.ejs', {level: level});
});

router.get('/classes', (req, res) => {
    res.render(path + '/views/spellViews/spells-by-class.ejs');
});

router.get('/classes:class', (req, res) => {
    let theClass = req.params.class.substring(1);
    res.render(path + '/views/spellViews/spells-class-page.ejs', {theClass: theClass});
});

module.exports.spell_router = router;