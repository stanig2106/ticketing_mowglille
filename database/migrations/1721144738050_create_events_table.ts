import { BaseSchema } from '@adonisjs/lucid/schema';

export default class Events extends BaseSchema {
  protected tableName = 'events';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('url_id').notNullable().unique();

      table.string('name').notNullable();
      table.text('description');

      table.timestamp('start_at').notNullable();
      table.timestamp('end_at').notNullable();

      table.timestamp('ticketing_start_at').notNullable();

      table.time('time_to_pay').notNullable();

      table
        .integer('price_pack_id')
        .unsigned()
        .references('id')
        .inTable('price_packs');

      table.string('banner_url');
      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
