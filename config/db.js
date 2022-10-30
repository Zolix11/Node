const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/KYQU46', { useNewUrlParser: true });

module.exports = mongoose;