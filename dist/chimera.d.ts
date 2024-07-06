/**
 * Represents a ChimeraDB instance.
 *
 * @class ChimeraDB
 */
declare class ChimeraDB {
    private tableDB;
    private documentDB;
    private dbName;
    constructor(dbName: string);
    /**
     * Initializes the database. If the database file exists, it loads the data from it.
     * If the database file does not exist, it creates a new file.
     *
     * @returns {void}
     */
    private initializeDB;
    /**
     * Saves the database to the physical .cdb file.
     *
     * @returns {void}
     */
    private saveDB;
    /**
     * Loads the database from the physical .cdb file.
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
     * Drops a table from the database.
     *
     * @param {string} name - The name of the table to drop.
     * @returns {void}
     */
    dropTable(name: string): void;
    /**
     * Drops a collection from the database.
     *
     * @param {string} name - The name of the collection to drop.
     * @returns {void}
     */
    dropCollection(name: string): void;
}
export { ChimeraDB };
//# sourceMappingURL=chimera.d.ts.map