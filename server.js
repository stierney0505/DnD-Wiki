const express = require('express');
const path = require('path');
const spell_routes = require('./router/spells.js').spell_router;

const app = express();
const port = 5000;

//Starts server on port
app.listen(port, (error) => {
    if (!error)
        console.log("Server is running on port" + port);
    else
        console.log("Server failed to start", error)
});

//Sends home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home-page.html'));
})

app.use(express.static('public'));
app.use('/components', express.static(path.join(__dirname, 'views/components')));
app.use('/static', express.static(path.join(__dirname, 'node_modules')));
app.use('/spells', spell_routes);

