const settings = require("./settings");
const pg = require('pg');

const config = {
  user: settings.user,
  database: settings.database,
  password: settings.password,
  port: settings.port
};

const db = new pg.Client(config);

const getAlbumTracks = (artistName, albumName, callback) => {
  db.connect((err) => {
    if (err) throw err;

    let query = `SELECT tracks.title AS title,
                albums.title AS album,
                artists.name AS artist
                FROM tracks
                JOIN album ON tracks.album_id = albums.id
                JOIN artists ON albums.artists_id = artists.id
                WHERE artists.name = $1::text AND albums.title = $2::text;`;

    db.query(query, [artistName, albumName], (err, results) => {
      if (err) {
        console.log("Something went wrong:", err);
        callback([]);
      } else {
        callback(result.rows);
      }
      db.end();
    });
  });
};

module.exports = {
  getAlbumTracks: getAlbumTracks
};