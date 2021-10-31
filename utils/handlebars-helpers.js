const handlebarsHelpers = {
  'find-price': (entries, selectedItem) => {
    const found = entries.find((item) => item[0] === selectedItem);

    if (!found) throw new Error(`Cannot find price of ${selectedItem}`);
    const [, price] = found;
    return price;
  },

  pricify: (price) => price.toFixed(2),

  isNotInArray: (array, item) => !array.includes(item),
};

module.exports = {
  handlebarsHelpers,
};
