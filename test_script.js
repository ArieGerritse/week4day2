const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv.slice(2);


const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});


function connect() {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }

    postEach();
  });
}

function postName(result, row) {

  console.log(`-${parseInt(row) + 1}: ${result.rows[row].first_name} ${result.rows[row].last_name
      }, born ${result.rows[row].birthdate.toISOString().substr(0, 10)}`);

}

function postEach() {

  client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE last_name  IN ($1::text)",
    name, (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      console.log(`Found ${result.rowCount} person(s) by the name '${name}:'`);
      for (let x in result.rows) {
        postName(result, x);
      }
      client.end();
    });
}

connect();