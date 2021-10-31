const express = require('express');
const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookies-data');
const { handlebarsHelpers } = require('../utils/handlebars-helpers');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  const { cookieBase } = req.cookies;
  const addons = getAddonsFromReq(req);

  //* syntax in handlebars like objectName['property-name'] means objectName.propertyName like in JS
  const sum = (cookieBase ? handlebarsHelpers['find-price'](Object.entries(COOKIE_BASES), cookieBase) : 0)
    + addons.reduce((prev, curr) => prev + handlebarsHelpers['find-price'](Object.entries(COOKIE_ADDONS), curr), 0);

  res.render('home/index', {
    cookie: {
      base: cookieBase,
      addons: addons,
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum,
  });
});

module.exports = {
  homeRouter,
};
