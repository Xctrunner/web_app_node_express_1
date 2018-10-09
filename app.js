const chalk = require('chalk');
const debug = require('debug')('app');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

const config = {
  user: '...', // use creds we set up in Azure earlier
  password: '...',
  server: '', // e.g. pslibrary.database.windows.net, also created earlier
  database: '...',
  options: {
    encrypt: true, // use if on Azure
  },
};

// need to go to firewall settings, add client IP
sql.connect(config).catch(err => debug(err));

// can use 'tiny' for less info
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// doesn't have to be library
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' },
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// res.send('Hello from my library app');
// without EJS
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav,
      title: 'Library',
    },
  );
});

app.listen(3002, () => debug(`listening on port ${chalk.green('3002')}`));
