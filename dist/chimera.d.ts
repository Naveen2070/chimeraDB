/**
 * Represents a ChimeraDB instance.
 *
 * @class ChimeraDB
 */
declare class ChimeraDB {
    private tableDB;
    private documentDB;
    private dbName;
    private currentLogicalDB;
    constructor(dbName: string);
    /**
     * Creates a new physical .cdb file.
     *
     * @returns {Promise<void>}
     */
    private createPhysicalDB;
    /**
     * Drops (deletes) the physical database file.
     *
     * @returns {Promise<void>}
     */
    dropDatabaseGroup(): Promise<void>;
    /**
     * Drops (deletes) a logical database from the physical .cdb file.
     *
     * @param {string} logicalDBName - The name of the logical database to drop.
     * @returns {Promise<void>}
     */
    dropDatabase(logicalDBName: string): Promise<void>;
    /**
     * Saves the current logical database to the physical .cdb file.
     *
     * @returns {Promise<void>}
     */
    private saveDB;
    /**
     * Loads the current logical database from the physical .cdb file.
     *
     * @returns {Promise<void>}
     */
    private loadDB;
    /**
     * Connects to an existing physical .cdb file.
     *
     * @param {string} dbName - The name of the physical database to connect to.
     * @returns {Promise<void>}
     */
    connect(dbName: string): Promise<void>;
    /**
     * Creates a new logical database within the physical .cdb file.
     *
     * @param {string} logicalDBName - The name of the logical database to create.
     * @returns {Promise<void>}
     */
    createDB(logicalDBName: string): Promise<void>;
    /**
     * Uses a logical database within the physical .cdb file.
     *
     * @param {string} logicalDBName - The name of the logical database to use.
     * @returns {Promise<void>}
     */
    use(logicalDBName: string): Promise<void>;
    /**
     * Creates a new table in the current logical database.
     *
     * @param {string} name - The name of the table.
     * @param {string[]} columns - The columns of the table.
     * @returns {Promise<void>}
     */
    createTable(name: string, columns: string[]): Promise<void>;
    /**
     * Inserts a row of values into the specified table.
     *
     * @param {string} name - The name of the table to insert into.
     * @param {any[]} values - The values to insert into the table.
     * @returns {Promise<void>}
     */
    insertIntoTable(name: string, values: any[]): Promise<void>;
    /**
     * Retrieves all rows from the specified table.
     *
     * @param {string} name - The name of the table to retrieve from.
     * @returns {Promise<any[][]>}
     */
    selectFromTable(name: string): Promise<any[][]>;
    /**
     * Creates a new collection in the current logical database.
     *
     * @param {string} name - The name of the collection.
     * @returns {Promise<void>}
     */
    createCollection(name: string): Promise<void>;
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - The name of the collection to insert into.
     * @param {any} doc - The document to insert.
     * @returns {Promise<void>}
     */
    insertIntoCollection(name: string, doc: any): Promise<void>;
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - The name of the collection to retrieve from.
     * @returns {Promise<any[]>}
     */
    selectFromCollection(name: string): Promise<any[]>;
    /**
     * Drops a table from the current logical database.
     *
     * @param {string} name - The name of the table to drop.
     * @returns {Promise<void>}
     */
    dropTable(name: string): Promise<void>;
    /**
     * Drops a collection from the current logical database.
     *
     * @param {string} name - The name of the collection to drop.
     * @returns {Promise<void>}
     */
    dropCollection(name: string): Promise<void>;
}
export { ChimeraDB };
//# sourceMappingURL=chimera.d.ts.map