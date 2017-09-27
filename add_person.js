var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'development',
    password: 'development',
    database: 'vagrant'
  },
  useNullAsDefault: true
});

const name = process.argv.slice(2);


knex.insert([{
  first_name: name[0],
  last_name: name[1],
  birthdate: name[2]
}]).into('famous_people').then(function(id) {}).finally(function() {
  knex.destroy();
});