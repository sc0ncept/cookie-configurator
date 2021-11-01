const { getAddonsFromReq } = require('./get-addons-from-req');
const { handlebarsHelpers } = require('./handlebars-helpers');
const { COOKIE_BASES, COOKIE_ADDONS } = require('../data/cookies-data');

function getCookieSettings(req) {
  const { cookieBase: base } = req.cookies;
  const addons = getAddonsFromReq(req);

  const allBases = Object.entries(COOKIE_BASES);
  const allAddons = Object.entries(COOKIE_ADDONS);

  const sum = (base ? handlebarsHelpers['find-price'](allBases, base) : 0)
    + addons.reduce((prev, curr) => prev + handlebarsHelpers['find-price'](allAddons, curr), 0);

  return {
    // selected
    base,
    addons,
    // calculations
    sum,
    // all available
    allBases,
    allAddons,
  };
}

module.exports = {
  getCookieSettings,
};
