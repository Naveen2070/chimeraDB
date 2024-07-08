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
     * An instance of TableDatabase.
     *
     * @type {TableDatabase}
     */
    private tableDB;
    /**
     * An instance of DocumentDatabase.
     *
     * @type {DocumentDatabase}
     */
    private documentDB;
    /**
     * The name of the database.
     *
     * @type {string}
     */
    private dbName;
    /**
     * Creates an instance of ChimeraDB.
     *
     * @param {string} dbName  The name of the database.
     */
    constructor(dbName: string);
    /**
     * Initializes the database. If the database file exists, it loads the data from it.
     * If the database file does not exist, it creates a new file.
     *
     * @returns {void}
     */
    private initializeDB;
    /**
     * Saves the database to the physical .cdb.db file.
     *
     * @returns {void}
     */
    private saveDB;
    /**
     * Loads the database from the physical .cdb.db file.
     *
     * @returns {void}
     */
    private loadDB;
    /**
     * Creates a new table in the database.
     *
     * @param {string} name - The name of the table.
     * @param {string[]} columns - The columns of the table.
     * @example
     * // Create a new table
     * const db = new ChimeraDB('my_database');
     * db.createTable('users', ['id', 'name', 'email']);
     * @returns {void}
     */
    createTable(name: string, columns: string[]): void;
    /**
     * Inserts a row of values into the specified table.
     *
     * @param {string} name - The name of the table to insert into.
     * @param {any[]} values - The values to insert into the table.
     * @example
     * // Insert a row of values into the 'users' table
     * const db = new ChimeraDB('my_database');
     * db.insertIntoTable('users', [1, 'John Doe', 'john@example.com']);
     * @returns {void}
     */
    insertIntoTable(name: string, values: any[]): void;
    /**
     * Retrieves all rows from the specified table.
     *
     * @param {string} name - The name of the table to retrieve from.
     * @example
     * // Retrieve all rows from the 'users' table
     * const db = new ChimeraDB('my_database');
     * const users = db.selectFromTable('users');
     * console.log(users);
     * @returns {any[][]} An array of rows in the specified table.
     */
    selectFromTable(name: string): any[][];
    /**
     * Creates a new collection in the database.
     *
     * @param {string} name - The name of the collection.
     * @example
     * // Create a new collection
     * const db = new ChimeraDB('my_database');
     * db.createCollection('posts');
     * @returns {void}
     */
    createCollection(name: string): void;
    /**
     * Inserts a document into the specified collection.
     *
     * @param {string} name - The name of the collection to insert into.
     * @param {any} doc - The document to insert.
     * @example
     * // Insert a document into the 'posts' collection
     * const db = new ChimeraDB('my_database');
     * db.insertIntoCollection('posts', { title: 'Hello World', content: 'This is my first post' });
     * @returns {void}
     */
    insertIntoCollection(name: string, doc: any): void;
    /**
     * Retrieves all documents from the specified collection.
     *
     * @param {string} name - The name of the collection to retrieve from.
     * @example
     *  Retrieve all documents from the 'posts' collection
     * const db = new ChimeraDB('my_database');
     * const posts = db.selectFromCollection('posts');
     * console.log(posts);
     * Output:
     * [
     *   { title: 'Hello World', content: 'This is my first post' },
     *   { title: 'Another Post', content: 'This is another post' },
     *    ...
     *  ]
     * @returns {any[]} An array of documents in the specified collection.
     */
    selectFromCollection(name: string): any[];
    /**
     * Drops a table from the database.
     *
     * @param {string} name - The name of the table to drop.
     * @example
     * // Drop the 'users' table
     * const db = new ChimeraDB('my_database');
     * db.dropTable('users');
     *
     * @example
     * // Drop multiple tables
     * const db = new ChimeraDB('my_database');
     * db.dropTable('users');
     * db.dropTable('products');
     *
     * @returns {void}
     */
    dropTable(name: string): void;
    /**
     * Drops a collection from the database.
     *
     * @param {string} name - The name of the collection to drop.
     * @example
     * // Drop the 'posts' collection
     * const db = new ChimeraDB('my_database');
     * db.dropCollection('posts');
     *
     * @example
     * // Drop multiple collections
     * const db = new ChimeraDB('my_database');
     * db.dropCollection('posts');
     * db.dropCollection('comments');
     *
     * @returns {void}
     */
    /**
     * Drops a collection from the database.
     *
     * @param {string} name - The name of the collection to drop.
     * @returns {void}
     */
    dropCollection(name: string): void;
    /**
     * Drops the entire database by deleting the .cdb.db file.
     *
     * This function drops the entire database by deleting the .cdb.db file.
     * The database is deleted from the file system, so all data in the database
     * is permanently lost.
     *
     * @example
     * // Drop the entire database
     * const db = new ChimeraDB('my_database');
     * db.dropDatabase();
     * console.log('Database deleted.');
     *
     * @returns {void}
     */
    dropDatabase(): void;
}
/**
 * Retrieves data from a file based on the provided database name.
 *
 * This function checks if the file exists in the current working directory.
 * If the file exists, it reads the file and returns the parsed data as an object.
 *
 * @param {string} dbName - The name of the database.
 * @returns {Object} The data from the file.
 * @property {Object} tables - An object containing the table definitions.
 * @property {Object} documents - An object containing the document collections.
 *
 * @example
 * Retrieve data from a file
 * const dbData = getFile('my_database');
 * console.log(dbData);
 * Output:
 * {
 *     tables: {
 *     users: {
 *        name: 'string',
 *        age: 'number',
 *        email: 'string'
 *      },
 *      posts: {
 *        title: 'string',
 *        content: 'string',
 *        authorId: 'number'
 *     }
 *    },
 *    documents: {
 *      users: [
 *        { name: 'John', age: 25, email: 'john@example.com' },
 *        { name: 'Jane', age: 30, email: 'jane@example.com' }
 *      ],
 *      posts: [
 *        { title: 'Hello World', content: 'This is my first post', authorId: 1 },
 *        { title: 'Another Post', content: 'This is another post', authorId: 2 }
 *      ]
 *    }
 *  }
 *
 * @throws {Error} If the file does not exist.
 */
declare function getFile(dbName: string): any;
/**
 * Saves data to a file.
 *
 * @param {string} dbName - The name of the database.
 * @param {any} data - The data to save. This can be an object with tables and collections
 * properties, or any other data type.
 *
 * @example
 * // Save data to a file
 * const dbData = {
 *   tables: {
 *     users: {
 *       name: 'string',
 *       age: 'number',
 *       email: 'string'
 *     },
 *     posts: {
 *       title: 'string',
 *       content: 'string',
 *       authorId: 'number'
 *     }
 *   },
 *   collections: {
 *     users: [
 *       { name: 'John', age: 25, email: 'john@example.com' },
 *       { name: 'Jane', age: 30, email: 'jane@example.com' }
 *     ],
 *     posts: [
 *       { title: 'Hello World', content: 'This is my first post', authorId: 1 },
 *       { title: 'Another Post', content: 'This is another post', authorId: 2 }
 *     ]
 *   }
 * };
 *
 * saveFile('my_database', dbData);
 *
 */
declare function saveFile(dbName: string, data: any): void;
export { ChimeraDB, getFile, saveFile };
//# sourceMappingURL=chimera.d.ts.map