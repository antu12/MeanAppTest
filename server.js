const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const api = require('./server/routes/api');
const config = require('./config');

const port = 3000;

const app = express();

process.env.NODE_ENV = 'dev';

app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api);

function _initializeModels() {
  mongoose.connect(config.db);
  mongoose.connection.on('error', function (err) {
    console.log("Mongodb failed to connect",{err: err});
  });
}

_initializeModels();

app.get('*',(req,res) => {
  res.send('Home');
});

app.listen(port, function () {
  console.log("Server running on port: "+port);
});
