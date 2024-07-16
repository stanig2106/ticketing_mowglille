import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  //   make role a number instead a string, with default value 0

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('role').defaultTo(0).alter();
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role').alter();
    });
  }
}
