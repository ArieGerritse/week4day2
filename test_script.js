const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv.slice(2);

console.log(name);

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE last_name  IN ($1::text)",
    name, (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      // console.log(result.rows[0].number); //output: 1
      // console.log(result.rows[0]);
      for (let x in result.rows[0]) {
        console.log(result.rows[0][x]);
        console.log(x);
      }
      // console.log(Object.keys(result.rows).length);
      console.log(`Found ${result.rowCount} person(s) by the name '${name}:'`);
      console.log(`-${result.rowCount}: ${result.rows[0].first_name} ${result.rows[0].last_name
      }, born ${result.rows[0].birthdate.toISOString().substr(0, 10)}`);
      // console.log(result.rows[0].first_name);
      client.end();
    });
});