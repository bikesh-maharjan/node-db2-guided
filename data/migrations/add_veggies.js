// record changes to database schema
exports.up = function (knex) {
  return knex.schema.createTable("veggies", (tbl) => {
    // primary key, named 'id', unsigned integer, auto-increment
    tbl.increments("id"); // defaulst to 'id', but we can change it
    // strings are commonly defined as varchar() in relational databases
    // .unique() will define a unique constraint, the database won't allow duplicate names
    // .notNullable() makes the name required, no empty names (NULL) allowed
    // .index() adds an index on the table for to make searching faster when using the name column
    tbl.string("name", 255).unique().notNullable().index();
    tbl.integer("rating").defaultTo(1);
  });
};
// undo changes defined on the up function
// ran with knex migrate: rollback or knex migrate: down
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("veggies");
};
