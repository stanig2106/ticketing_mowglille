import { BaseSchema } from '@adonisjs/lucid/schema';

export default class PriceOptionVariants extends BaseSchema {
  protected tableName = 'price_option_variants';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.string('name').notNullable();

      table.float('new_price').checkPositive().notNullable();

      table
        .integer('price_option_id')
        .unsigned()
        .notNullable()
        .unique() // only one variant per price option
        .references('id')
        .inTable('price_options');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
