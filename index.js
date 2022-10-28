const express = require('express');
const app = express();

app.use(express.static('static'));
app.set('view engine', 'ejs');

require('./routes/route')(app);

app.listen(3000, function () {
    console.log('GOGO : 3000');
});