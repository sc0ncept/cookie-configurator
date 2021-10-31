function showErrorPage(res, description) {
  return res.render('error/error', {
    description,
  });
}

module.exports = {
  showErrorPage,
};
