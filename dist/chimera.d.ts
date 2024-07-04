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
     * The table database instance.
     *
     * @private
     * @type {TableDatabase}
     */
    private tableDB;
    /**
     * The document database instance.
     *
     * @private
     * @type {DocumentDatabase}
     */
    private documentDB;
    /**
     * The name of the database.
     *
     * @private
     * @type {string}
     */
    private dbName;
    /**
     * Constructs a new instance of ChimeraDB.
     *
     * @constructor
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
     * Saves the database to a file.
     *
     * @returns {void}
     */
    private saveDB;
    /**
     * Loads the database from a file.
     *
     * @returns {void}
     */
    private loadDB;
    /**
     * Creates a new table in the database.
     *
     * @param {string} name - The name of the table.
     * @param {string[]} columns - The columns of the table.
     * @returns {void}
     */
    createTable(name: string, columns: string[]): void;
    /**
     * Inserts a row of values into the specified table.
     *
     * @param {string} name - The name of the table to insert into.
     * @param {any[]} values - The values to insert into the table.
     * @returns {void}
     */
    insertIntoTable(name: string, values: any[]): void;
    /**
     * Retrieves all rows from the specified table.
     *
     * @param {string} name - The name of the table to retrieve from.
     * @returns {any[][]} An array of rows in the specified table.
     */
    selectFromTable(name: string): any[][];
    /**
     * Creates a new collection in the database.
     *
     * @param {string} name - The name of the collection.
     * @returns {void}
     */
    createCollection(name: string): void;
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - The name of the collection to insert into.
     * @param {any} doc - The document to insert.
     * @returns {void}
     */
    insertIntoCollection(name: string, doc: any): void;
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - The name of the collection to retrieve from.
     * @returns {any[]} An array of documents in the specified collection.
     */
    selectFromCollection(name: string): any[];
    /**
     * Loads an existing database file.
     *
     * @param {string} dbName - The name of the database to load.
     * @returns {void}
     */
    use(dbName: string): void;
}
export { ChimeraDB };
//# sourceMappingURL=chimera.d.ts.map