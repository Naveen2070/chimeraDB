import { Table } from './Table';

/**
 * Represents a database of tables.
 */
/**
 * Represents a database of tables.
 */
export class TableDatabase {
  /**
   * Maps table names to table objects.
   */
  private tables: { [key: string]: Table } = {};

  /**
   * Creates a new table with the given name and columns.
   *
   * @param {string} name - The name of the table.
   * @param {string[]} columns - The columns of the table.
   * @throws {Error} Throws an error if a table with the given name already exists.
   *
   * @example
   * const db = new TableDatabase();
   * db.createTable('users', ['id', 'name', 'email']);
   */
  createTable(name: string, columns: string[]): void {
    if (this.tables[name]) {
      throw new Error(`Table ${name} already exists.`);
    }
    this.tables[name] = { name, columns, rows: [] };
  }

  /**
   * Inserts a row of values into the specified table.
   *
   * @param {string} name - The name of the table to insert into.
   * @param {any[]} values - The values to insert into the table.
   * @throws {Error} Throws an error if the table does not exist or the column count does not match the value count.
   *
   * @example
   * const db = new TableDatabase();
   * db.createTable('users', ['id', 'name', 'email']);
   * db.insertIntoTable('users', [1, 'John Doe', 'john@example.com']);
   */
  insertIntoTable(name: string, values: any[]): void {
    const table = this.tables[name];
    if (!table) {
      throw new Error(`Table ${name} does not exist.`);
    }
    if (values.length !== table.columns.length) {
      throw new Error('Column count does not match value count.');
    }
    table.rows.push(values);
  }

  /**
   * Retrieves all rows from the specified table.
   *
   * @param {string} name - The name of the table to retrieve from.
   * @throws {Error} Throws an error if the table does not exist.
   * @returns {any[][]} An array of rows in the specified table.
   *
   * @example
   * const db = new TableDatabase();
   * db.createTable('users', ['id', 'name', 'email']);
   * db.insertIntoTable('users', [1, 'John Doe', 'john@example.com']);
   * const rows = db.selectFromTable('users');
   * console.log(rows); // [[1, 'John Doe', 'john@example.com']]
   */
  selectFromTable(name: string): any[][] {
    const table = this.tables[name];
    if (!table) {
      throw new Error(`Table ${name} does not exist.`);
    }
    return table.rows;
  }

  /**
   * Drops (deletes) a table from the database.
   *
   * @param {string} name - The name of the table to drop.
   * @returns {void}
   *
   * @example
   * const db = new TableDatabase();
   * db.createTable('users', ['id', 'name', 'email']);
   * db.dropTable('users');
   */
  dropTable(name: string): void {
    if (!this.tables[name]) {
      throw new Error(`Table ${name} does not exist.`);
    }
    delete this.tables[name];
  }

  /**
   * Retrieves all tables in the database.
   * @returns {{ [key: string]: Table }} A map of table names to table objects.
   *
   * @example
   * const db = new TableDatabase();
   * db.createTable('users', ['id', 'name', 'email']);
   * const tables = db.getTables();
   * console.log(tables); // { users: { name: 'users', columns: ['id', 'name', 'email'], rows: [] } }
   */
  getTables(): { [key: string]: Table } {
    return this.tables;
  }

  /**
   * Sets the tables in the database.
   *
   * @param { { [key: string]: Table } } tables - The tables to set.
   *
   * @example
   * const db = new TableDatabase();
   * const tables = {
   *   users: { name: 'users', columns: ['id', 'name', 'email'], rows: [] },
   *   posts: { name: 'posts', columns: ['id', 'title', 'content'], rows: [] },
   * };
   * db.setTables(tables);
   */
  setTables(tables: { [key: string]: Table }): void {
    this.tables = tables;
  }
}
