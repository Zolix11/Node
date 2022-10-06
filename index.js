const express = require('express');
const app = express();

require('./routes/route')(app);

app.use(express.static('static'));
app.listen(3000, function () {
    console.log('GOGO : 3000');
});