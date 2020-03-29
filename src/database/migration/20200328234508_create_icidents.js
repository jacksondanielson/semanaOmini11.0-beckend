
exports.up = function(knex) {
    return knex.schema.createTable('icidents', function (table) {
      table.increments();
      table.string('title').notNullable();
      table.string('drescription').notNullable();
      table.decimal('value').notNullable();

      table.string('ong_id').notNullable();

      table.foreign('ong_id').references('id').inTable('ongs');
    });
  };
  
  exports.down = function(knex) {
   return knex.schema.dropTable('icidents');
  };
  