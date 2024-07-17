import { BaseSchema } from '@adonisjs/lucid/schema';

export default class AlterUsersTable extends BaseSchema {
  protected tableName = 'users';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role');
    });
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('role').defaultTo(0);
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role');
    });
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('role', ['user', 'admin', 'super_admin']).defaultTo('user');
    });
  }
}
