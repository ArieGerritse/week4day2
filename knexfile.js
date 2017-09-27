// Update with your config settings.

const settings = require("./settings");

module.exports = {

  development: {
    client: 'postgresql',
    connection: settings
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};