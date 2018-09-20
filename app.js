const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

// can use 'tiny' for less info
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist/')));

app.get('/', (req, res) => {
  // res.send('Hello from my library app');
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(3002, () => {
  debug(`listening on port ${chalk.green('3002')}`);
});
