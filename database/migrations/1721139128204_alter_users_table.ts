import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', ['user', 'admin', 'super_admin']).defaultTo('user');
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role');
    });
  }
}
