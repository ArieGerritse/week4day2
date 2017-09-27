exports.up = function(knex, Promise) {
  return knex.schema.table('famous_people', (table) => {

    table.increments('id').unsigned().primary();
    table.string('description');
    table.date('date_achieved');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('famous_people', (table) => {
    table.dropColumns('description', 'date_achieved');
  });

};