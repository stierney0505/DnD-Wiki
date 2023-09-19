const express = require('express');
require('dotenv').config();
const router = express.Router();
const path = process.env.__PATH;
const app = express();

app.set('view engine', 'ejs');

router.get('/', (req, res) => {
    res.render(path + '/views/spellViews/spells-home-page.ejs');
})

router.get('/class:class', (req, res) => {
    const spellClass = req.params.class; // Access the parameter :class
    // Perform actions specific to the spell class (e.g., retrieve spells for the class)
    res.send(`Displaying spells for ${spellClass} class`);
});

module.exports.spell_router = router;