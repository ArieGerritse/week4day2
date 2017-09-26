const settings = require("./settings");
const pg = require('pg');

const config = {
  user: settings.user,
  database: settings.database,
  password: settings.password,
  port: settings.port
};

const db = new pg.Client(config);

db.connect(error => {
  if (error) throw error;

  var someId = process.argv[2];

  db.query(`SELECT * FROM albums WHERE id = $1`, [someId])
    .then(results => {
      results.rows.forEach(row => {
        console.log(row);
        for (column in row) {
          console.log(column, row[column]);
        }
      });
      return 'YAY!';
    })
    .then(mood => {
      console.log(mood);
      db.end(error => {
        if (error) throw error;
      });

    })
    .catch(e => console.error(e.stack));
});