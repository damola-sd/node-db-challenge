
exports.up = function(knex) {
  return knex.schema
        .createTable('projects', table => {
            table.increments();
            table.text('projectName', 256).notNullable();
            table.text('description', 1000);
            table.boolean("completed").defaultTo(false);
        })
        .createTable('actions', table => {
            table.increments();
            table.text('description', 1000).notNullable();
            table.text('notes', 2000);
            table.boolean("completed").defaultTo(false);
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects');
        })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('actions');
};
