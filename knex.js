// var db = require('knex')({
//   client: 'pg',
//   connection: 'postgres://development@localhost:5432/famous_people',//'postgres://username:password', //kjensen@localhost:5432/w42
//   searchPath: 'knex,public'
// });

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'development',
    password: 'development',
    database: 'vagrant'
  }
});

const name = process.argv.slice(2);


knex('famous_people').where('last_name', name[0]).asCallback((error, result) => {

  if (error) {
    return console.error("error running query", error);
  }

  console.log(`Found ${result.rowCount} person(s) by the name '${name}:'`);
  for (let x in result) {
    console.log(`-${parseInt(x) + 1}: ${result[x].first_name} ${result[x].last_name
        }, born ${result[x].birthdate.toISOString().substr(0, 10)}`);
  }

  process.exit();
});