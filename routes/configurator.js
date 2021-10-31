const express = require('express');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');
const {
  COOKIE_ADDONS,
  COOKIE_BASES,
} = require('../data/cookies-data');
const { showErrorPage } = require('../utils/show-error-page');

const configRouter = express.Router();

configRouter
  .get('/select-base/:baseName', (req, res) => {
    const { baseName } = req.params;

    if (!COOKIE_BASES[baseName]) {
      return showErrorPage(res, `There is no such a base as ${baseName}`);
    }

    res
      .cookie('cookieBase', baseName)
      .render('configurator/base-selected', {
        baseName,
      });
  })

  .get('/add-addon/:addonName', (req, res) => {
    const { addonName } = req.params;

    if (!COOKIE_ADDONS[addonName]) {
      return showErrorPage(res, `There is no such a addon as ${addonName}`);
    }

    const addons = getAddonsFromReq(req);

    if (addons.includes(addonName)) {
      return showErrorPage(res, `${addonName} has been already added to your cookie, you cannot add it twice`);
    }

    addons.push(addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', {
        addonName,
      });
  })

  .get('/remove-addon/:addonName', (req, res) => {
    const { addonName } = req.params;
    const oldAddons = getAddonsFromReq(req);

    if (!oldAddons.includes(addonName)) {
      return showErrorPage(res, `You cannot remove something that isn't already add to your cookie, ${addonName} has not been found.`);
    }

    const addons = oldAddons.filter((addon) => addon !== addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/removed', {
        addonName,
      });
  });

module.exports = {
  configRouter,
};
