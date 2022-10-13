const express = require('express');
const app = express();

app.use(express.static('static'));

require('./routes/route')(app);

app.listen(3000, function () {
    console.log('GOGO : 3000');
});