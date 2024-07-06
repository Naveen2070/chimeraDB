/**
 * Represents a table in the database.
 *
 * @interface Table
 */
/**
 * Represents a table in the database.
 *
 * @interface Table
 * @example
 * // Example of a Table object
 * const table: Table = {
 *   name: 'users',
 *   columns: ['id', 'name', 'email'],
 *   rows: [
 *     [1, 'John', 'john@example.com'],
 *     [2, 'Jane', 'jane@example.com'],
 *     [3, 'Bob', 'bob@example.com']
 *   ]
 * };
 */
export interface Table {
    /**
     * The name of the table.
     *
     * @type {string}
     * @example
     * 'users'
     */
    name: string;
    /**
     * The array of column names.
     *
     * @type {string[]}
     * @example
     * ['id', 'name', 'email']
     */
    columns: string[];
    /**
     * The array of rows, where each row is an array of values corresponding
     * to the columns.
     *
     * @type {any[][]}
     * @example
     * [
     *   [1, 'John', 'john@example.com'],
     *   [2, 'Jane', 'jane@example.com'],
     *   [3, 'Bob', 'bob@example.com']
     * ]
     */
    rows: any[][];
}
//# sourceMappingURL=Table.d.ts.map