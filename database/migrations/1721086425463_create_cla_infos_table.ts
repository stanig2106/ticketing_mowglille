import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'cla_infos';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('username').notNullable();
      table.string('first_name');
      table.string('last_name');
      table.string('school_email').notNullable();
      table.string('cursus');
      table.string('promo');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
