const express = require('express');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');

const configRouter = express.Router();

configRouter
  .get('/select-base/:baseName', (req, res) => {
    const { baseName } = req.params;
    res
      .cookie('cookieBase', baseName)
      .render('configurator/base-selected', {
        baseName,
      });
  })

  .get('/add-addon/:addonName', (req, res) => {
    const { addonName } = req.params;
    const addons = getAddonsFromReq(req);
    addons.push(addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', {
        addonName,
      });
  })

  .get('/remove-addon/:addonName', (req, res) => {
    const { addonName } = req.params;
    const addons = getAddonsFromReq(req).filter((addon) => addon !== addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/removed', {
        addonName,
      });
  });

module.exports = {
  configRouter,
};
