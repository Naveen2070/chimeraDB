/**
 * Represents a ChimeraDB instance.
 *
 * @class ChimeraDB
 */
/**
 * Represents a ChimeraDB instance.
 *
 * @class ChimeraDB
 */
/**
 * Represents a ChimeraDB instance.
 *
 * @class ChimeraDB
 */
declare class ChimeraDB {
    /**
     * Database name.
     *
     * @private
     * @type {string}
     */
    private dbName;
    /**
     * Table database.
     *
     * @private
     * @type {TableDatabase}
     */
    private tableDB;
    /**
     * Document database.
     *
     * @private
     * @type {DocumentDatabase}
     */
    private documentDB;
    /**
     * Creates an instance of ChimeraDB.
     *
     * @param {string} dbName - The name of the database.
     */
    constructor(dbName: string);
    /**
     * Creates a new database file.
     *
     * @returns {void}
     */
    createDB(): void;
    /**
     * Saves the database to a file in hex format.
     *
     * @returns {void}
     */
    saveDB(): void;
    /**
     * Loads an existing database file.
     *
     * @param {string} dbName - The name of the database to load.
     * @returns {void}
     */
    use(dbName: string): void;
    /**
     * Creates a new table in the database.
     *
     * @param {string} name - Table name.
     * @param {string[]} columns - Columns of the table.
     * @returns {void}
     */
    createTable(name: string, columns: string[]): void;
    /**
     * Inserts a row of values into the specified table.
     *
     * @param {string} name - Table name to insert into.
     * @param {any[]} values - Values to insert into the table.
     * @returns {void}
     */
    insertIntoTable(name: string, values: any[]): void;
    /**
     * Retrieves all rows from the specified table.
     *
     * @param {string} name - Table name to retrieve from.
     * @returns {any[][]} Array of rows in the specified table.
     */
    selectFromTable(name: string): any[][];
    /**
     * Creates a new collection in the database.
     *
     * @param {string} name - Collection name.
     * @returns {void}
     */
    createCollection(name: string): void;
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - Collection name to insert into.
     * @param {any} doc - Document to insert.
     * @returns {void}
     */
    insertIntoCollection(name: string, doc: any): void;
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - Collection name to retrieve from.
     * @returns {any[]} Array of documents in the specified collection.
     */
    selectFromCollection(name: string): any[];
}
export { ChimeraDB };
//# sourceMappingURL=chimera.d.ts.map