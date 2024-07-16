// database/migrations/xxxx_create_events_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class Events extends BaseSchema {
  protected tableName = 'events';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('url_id').notNullable();
      table.string('name').notNullable();
      table.text('description');
      table.timestamp('start_at').notNullable();
      table.timestamp('end_at').notNullable();
      table.timestamp('ticketing_start_at').notNullable();
      table.integer('time_to_pay').notNullable();
      table.integer('price_pack_id').unsigned().notNullable();
      table.string('banner_url');
      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
