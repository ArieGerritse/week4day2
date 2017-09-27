knex.schema.createTable('talbeName', (talbe) => {
  table.increments(); //auto inc PK
  table.string('variable thing');
  table.string('second variable ect..');
});

knex.schema.createTable('talbeName1', (talbe) => {
  table.dropColumn('tableName1'); //remove colomn
  table.string('variable thing'); // add talbes for first table
  table.string('second variable ect..');
});

knex.schema.talbe('table1', (talbe) => {
  table.integer('table1_id').unsigned();
});

var pg = require('knex')({
  client: 'pg',
  connection: 'postgres://username:password', //kjensen@localhost:5432/w42
  searchPath: 'knex,public'
});

console.log(knex('users').toString());

knex('users').asCallback((error, users) => {
  console.log(users);
});

knex('users').asCallback((error, users) => {
  done(users);
});

getAllUsers: (done) => {
  db.connect((error, client) => {
    client.query('select * from users', (err, result) => {
      done(result.rows);
      db.close(client);
    });
  });
};

getAllUsers: (done) => {
  knex('users').asCallback((error, users) => {
    done(users);
  });
};

module.exports = (database) => {
  return (request, repsonse, next) => {
    database.getALlUsers((users) => {
      repsonse.locals.users = users;
      next();
    });
  };
};

getAllUrlsForUser: (user, done) => {
  knex.select('short', 'long').from('urls').where('user_id', user).asCallback((error, urls) => {
    done(urls);
  });
};

//add to package.json add to scripts
//"knex": "node_modules/.bin/knex"
// npm run knex or npm run knex init for new file
// \dt to look at databases