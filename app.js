const chalk = require('chalk');
const debug = require('debug')('app');
const express = require('express');
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

app.set('views', './src/views');
app.set('view engine', 'ejs');

const bookRouter = require('./src/routes/bookRoutes');

app.use('/books', bookRouter);
// res.send('Hello from my library app');
// without EJS
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
      title: 'Library',
    },
  );
});

app.listen(3002, () => debug(`listening on port ${chalk.green('3002')}`));
