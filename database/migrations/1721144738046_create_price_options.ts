import { BaseSchema } from '@adonisjs/lucid/schema';

export default class PriceOptions extends BaseSchema {
  protected tableName = 'price_options';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();

      table.float('price').checkPositive().notNullable();
      table.integer('quantity').checkPositive().nullable();
      table.boolean('show_quantity').defaultTo(false);

      table
        .integer('price_pack_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('price_packs');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
