var $ = require('jquery');

module.exports = {
  getUsers: function () {
    return [
      {
        name: 'Cale',
        age: 33
      },
      {
        name: 'Elizabeth',
        age: 35
      },
      {
        name: 'Mason',
        age: 1
      }
    ];
  },
  getExchangeRates: function (base_currency) {
    return $.getJSON('http://api.fixer.io/latest?base=' + base_currency);
  }
};
