import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('recipes', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('ingredientes').notNullable();
        table.string('modo').notNullable();
    });
}

export async function down() {
    
}