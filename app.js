const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { homeRouter } = require('./routes/home');
const { configRouter } = require('./routes/configurator');
const { orderRouter } = require('./routes/order');
const { handlebarsHelpers } = require('./utils/handlebars-helpers');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Setting up Handlebars engine
app.engine(
  '.hbs',
  exphbs({
    extname: '.hbs',
    helpers: handlebarsHelpers,
  }),
);
app.set('view engine', '.hbs');

// Routes
app.use('/', homeRouter);
app.use('/configurator', configRouter);
app.use('/order', orderRouter);

app.listen('3000', 'localhost', () => console.log('Server started...'));
