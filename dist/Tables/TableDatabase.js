"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableDatabase = void 0;
/**
 * Represents a database of tables.
 *
 * @class TableDatabase
 */
class TableDatabase {
    /**
     * A map of table names to table objects.
     *
     * @type {Object.<string, Table>}
     * @private
     */
    tables = {};
    /**
     * Creates a new table with the given name and columns.
     *
     * @param {string} name - The name of the table.
     * @param {string[]} columns - The columns of the table.
     * @throws {Error} Throws an error if a table with the given name already exists.
     */
    createTable(name, columns) {
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
     */
    insertIntoTable(name, values) {
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
     */
    selectFromTable(name) {
        const table = this.tables[name];
        if (!table) {
            throw new Error(`Table ${name} does not exist.`);
        }
        return table.rows;
    }
    /**
     * Retrieves all tables in the database.
     *
     * @returns {{ [key: string]: Table }} A map of table names to table objects.
     */
    getTables() {
        return this.tables;
    }
}
exports.TableDatabase = TableDatabase;
//# sourceMappingURL=TableDatabase.js.map