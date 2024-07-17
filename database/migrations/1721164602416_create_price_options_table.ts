// database/migrations/xxxx_create_price_options_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema';

export default class PriceOptions extends BaseSchema {
  protected tableName = 'price_options';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.float('price').notNullable();
      table.float('price_pack_id').notNullable();
      table.integer('association_id');

      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
