import { BaseSchema } from '@adonisjs/lucid/schema';

export default class Associations extends BaseSchema {
  protected tableName = 'associations';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name').notNullable();
      table.string('logo_url');
      table.string('color');

      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
