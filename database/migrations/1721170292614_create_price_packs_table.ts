import { BaseSchema } from '@adonisjs/lucid/schema';

export default class PricePacks extends BaseSchema {
  protected tableName = 'price_packs';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();

      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
