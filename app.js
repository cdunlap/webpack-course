const api = require('./api.js');
const $ = require('jquery');
const ReactApp = require('./react/ReactApp.js');

const users = api.getUsers();

$.each(users, (index, user) => {
  $(document.body).append(`<p> name ${user.name} age ${user.age}</p>`);
});

api.getExchangeRates('USD')
  .success( data => console.debug(data) );
