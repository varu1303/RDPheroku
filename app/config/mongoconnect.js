const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/Todo', { useMongoClient: true });
mongoose.connect('mongodb://key:keyrdp@ds163745.mlab.com:63745/rdp-key', { useMongoClient: true });

module.exports = mongoose.connection;