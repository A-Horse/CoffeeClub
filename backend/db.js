var setting = require('./setting');

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: setting.db.production.host,
    user: setting.db.production.username,
    password: setting.db.production.passwd,
    database: setting.db.production.database
  }
});
var knex_develop = require('knex')({
  client: 'postgres',
  connection: {
    host: setting.db.development.host,
    user: setting.db.development.username,
    password: setting.db.development.passwd,
    database: setting.db.development.database
  }
});

if (setting.development) {
  exports.knex = knex_develop;
  exports.orm = require('bookshelf')(knex_develop);
} else {
  exports.knex = knex;
  exports.knex = require('bookshelf')(knex);
}