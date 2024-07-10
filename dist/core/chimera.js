"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChimeraDB = void 0;
exports.getFile = getFile;
exports.saveFile = saveFile;
const TableDatabase_1 = require("../Tables/TableDatabase");
const DocumentDatabase_1 = require("../Documents/DocumentDatabase");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
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
class ChimeraDB {
    /**
     * An instance of TableDatabase.
     *
     * @type {TableDatabase}
     */
    tableDB;
    /**
     * An instance of DocumentDatabase.
     *
     * @type {DocumentDatabase}
     */
    documentDB;
    /**
     * The name of the database.
     *
     * @type {string}
     */
    dbName;
    /**
     * Creates an instance of ChimeraDB.
     *
     * @param {string} dbName  The name of the database.
     */
    constructor(dbName) {
        this.tableDB = new TableDatabase_1.TableDatabase();
        this.documentDB = new DocumentDatabase_1.DocumentDatabase();
        this.dbName = dbName;
        this.initializeDB();
    }
    /**
     * Initializes the database. If the database file exists, it loads the data from it.
     * If the database file does not exist, it creates a new file.
     *
     * @returns {void}
     */
    initializeDB() {
        const filePath = path.resolve(process.cwd(), `${this.dbName}.cdb.db`);
        if (fs.existsSync(filePath)) {
            this.loadDB();
        }
        else {
            this.saveDB();
            console.log(`Database ${this.dbName}.cdb.db created.`);
        }
    }
    /**
     * Saves the database to the physical .cdb.db file.
     *
     * @returns {void}
     */
    saveDB() {
        const filePath = path.resolve(process.cwd(), `${this.dbName}.cdb.db`);
        const data = {
            tables: this.tableDB.getTables(),
            collections: this.documentDB.getCollections(),
        };
        fs.writeFileSync(filePath, JSON.stringify(data), 'binary');
    }
    /**
     * Loads the database from the physical .cdb.db file.
     *
     * @returns {void}
     */
    loadDB() {
        const filePath = path.resolve(process.cwd(), `${this.dbName}.cdb.db`);
        if (fs.existsSync(filePath)) {
            const dbData = JSON.parse(fs.readFileSync(filePath, 'binary'));
            this.tableDB.setTables(dbData.tables);
            this.documentDB.setCollections(dbData.collections);
        }
    }
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
    createTable(name, columns) {
        this.tableDB.createTable(name, columns);
        this.saveDB();
    }
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
    insertIntoTable(name, values) {
        this.tableDB.insertIntoTable(name, values);
        this.saveDB();
    }
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
    selectFromTable(name) {
        return this.tableDB.selectFromTable(name);
    }
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
    createCollection(name) {
        this.documentDB.createCollection(name);
        this.saveDB();
    }
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
    insertIntoCollection(name, doc) {
        this.documentDB.insertIntoCollection(name, doc);
        this.saveDB();
    }
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
    selectFromCollection(name) {
        /**
         * Retrieves all documents from the specified collection.
         *
         * @param {string} name - The name of the collection to retrieve from.
         * @returns {any[]} An array of documents in the specified collection.
         */
        return this.documentDB.selectFromCollection(name);
    }
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
    dropTable(name) {
        this.tableDB.dropTable(name);
        this.saveDB();
    }
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
    dropCollection(name) {
        this.documentDB.dropCollection(name);
        this.saveDB();
    }
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
    dropDatabase() {
        const filePath = path.resolve(process.cwd(), `${this.dbName}.cdb.db`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Database ${this.dbName}.cdb.db deleted.`);
        }
        else {
            console.error(`Database ${this.dbName}.cdb.db does not exist.`);
        }
    }
}
exports.ChimeraDB = ChimeraDB;
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
function getFile(dbName) {
    const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'binary'));
    }
    return { tables: {}, documents: {} };
}
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
function saveFile(dbName, data) {
    const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
    console.log(`Saving to file: ${filePath}`);
    try {
        const jsonData = JSON.stringify(data, null, 2); // Pretty-print JSON for readability
        console.log('====================================');
        console.log(jsonData);
        console.log('====================================');
        fs.writeFileSync(filePath, jsonData, { encoding: 'utf8' });
        console.log(`Database ${dbName} saved successfully.`);
    }
    catch (error) {
        console.error(`Error saving database ${dbName}:`, error);
    }
}
//# sourceMappingURL=chimera.js.map