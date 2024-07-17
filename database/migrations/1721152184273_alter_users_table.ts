import { BaseSchema } from '@adonisjs/lucid/schema';

export default class AlterUsersTable extends BaseSchema {
  protected tableName = 'users';

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Step 1: Add a new column
      table.integer('new_role').defaultTo(0);
    });

    // Step 2: Update new column with appropriate values
    this.defer(async (db) => {
      await db.raw(`UPDATE ${this.tableName}
                    SET new_role = CAST(role AS INTEGER)`);
    });

    this.schema.alterTable(this.tableName, (table) => {
      // Step 3: Drop the old column
      table.dropColumn('role');
    });

    this.schema.alterTable(this.tableName, (table) => {
      // Step 4: Rename new column to original name
      table.renameColumn('new_role', 'role');
    });
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Revert the changes by adding the old column back
      table.string('role');
    });

    // Copy the values back to the old column if needed
    this.defer(async (db) => {
      await db.raw(`UPDATE ${this.tableName}
                    SET role = CAST(new_role AS TEXT)`);
    });

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('new_role');
    });
  }
}
