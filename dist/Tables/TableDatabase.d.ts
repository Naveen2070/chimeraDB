import { Table } from './Table';
/**
 * Represents a database of tables.
 */
export declare class TableDatabase {
    /**
     * Maps table names to table objects.
     */
    private tables;
    /**
     * Creates a new table with the given name and columns.
     * @param {string} name - The name of the table.
     * @param {string[]} columns - The columns of the table.
     * @throws {Error} Throws an error if a table with the given name already exists.
     */
    createTable(name: string, columns: string[]): void;
    /**
     * Inserts a row of values into the specified table.
     * @param {string} name - The name of the table to insert into.
     * @param {any[]} values - The values to insert into the table.
     * @throws {Error} Throws an error if the table does not exist or the column count does not match the value count.
     */
    insertIntoTable(name: string, values: any[]): void;
    /**
     * Retrieves all rows from the specified table.
     * @param {string} name - The name of the table to retrieve from.
     * @throws {Error} Throws an error if the table does not exist.
     * @returns {any[][]} An array of rows in the specified table.
     */
    selectFromTable(name: string): any[][];
    /**
     * Drops (deletes) a table from the database.
     *
     * @param {string} name - The name of the table to drop.
     * @returns {void}
     */
    dropTable(name: string): void;
    /**
     * Retrieves all tables in the database.
     * @returns {{ [key: string]: Table }} A map of table names to table objects.
     */
    getTables(): {
        [key: string]: Table;
    };
    /**
     * Sets the tables in the database.
     * @param { { [key: string]: Table } } tables - The tables to set.
     */
    setTables(tables: {
        [key: string]: Table;
    }): void;
}
//# sourceMappingURL=TableDatabase.d.ts.map