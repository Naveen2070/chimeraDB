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
exports.connect = connect;
exports.create = create;
exports.queryFunction = queryFunction;
const chimera_1 = require("./chimera");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const functions_1 = require("../Documents/functions");
const functions_2 = require("../Tables/functions");
/**
 * Connects to an existing ChimeraDB database.
 *
 * This function creates an instance of ChimeraDB by connecting to an existing database.
 * It takes the name of the database as a parameter and checks if the specified database exists.
 * If the specified database exists, it returns the ChimeraDB instance.
 *
 * @example
 * // Connect to an existing database
 * const db = connect('my_database');
 * // Use the bound functions
 * db.createTable('users', ['id', 'name', 'email']);
 * db.insertIntoTable('users', [1, 'John Doe', 'john@example.com']);
 *
 * @param {string} dbName - The name of the database to connect to.
 * @returns {ChimeraDB} An instance of ChimeraDB.
 * @throws {Error} Throws an error if the specified database does not exist.
 */
function connect(dbName) {
    // Resolve the file path of the database
    const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
    // Check if the database exists
    if (fs.existsSync(filePath)) {
        // Create a new instance of ChimeraDB with the specified dbName
        return new chimera_1.ChimeraDB(dbName);
    }
    else {
        // Throw an error if the database does not exist
        throw new Error(`Database ${dbName}.cdb.db does not exist.`);
    }
}
/**
 * Creates a new database.
 *
 * This function takes the name of the database as a parameter and returns an instance of ChimeraDB.
 * If the specified database already exists, it throws an error.
 *
 * @example
 * // Create a new database
 * const db = create('my_database');
 * console.log(db.dbName); // Output: my_database
 *
 * @param {string} dbName - The name of the database to create.
 * @returns {ChimeraDB} An instance of ChimeraDB.
 * @throws {Error} Throws an error if the specified database already exists.
 */
function create(dbName) {
    // Resolve the file path of the database
    const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
    // Check if the database already exists
    if (fs.existsSync(filePath)) {
        // Throw an error if the database already exists
        throw new Error(`Database ${dbName}.cdb.db already exists.`);
    }
    else {
        // Create a new instance of ChimeraDB with the specified dbName
        return new chimera_1.ChimeraDB(dbName);
    }
}
/**
 * Provides a way to call functions with the default database name.
 *
 * This function creates an instance of a class that supplies functions with the default database name.
 *
 * @example
 * // Query function usage
 * const query = queryFunction('my_database');
 * query.createTable('users', ['id', 'name', 'email']);
 * query.insertIntoTable('users', [1, 'John Doe', 'john@example.com']);
 *
 * @param {string} dbName - The default database name.
 * @returns {object} An object with bound functions.
 */
function queryFunction(dbName) {
    class QueryFunctions {
        dbInstance;
        constructor(dbName) {
            this.dbInstance = connect(dbName);
            // Table functions
            this.createTable = (tableName, columns) => this.dbInstance.createTable(tableName, columns);
            this.insertIntoTable = (tableName, row) => this.dbInstance.insertIntoTable(tableName, row);
            this.selectFromTable = (tableName) => this.dbInstance.selectFromTable(tableName);
            this.dropTable = (tableName) => this.dbInstance.dropTable(tableName);
            // Collection functions
            this.createCollection = (collectionName) => this.dbInstance.createCollection(collectionName);
            this.insertIntoCollection = (collectionName, doc) => this.dbInstance.insertIntoCollection(collectionName, doc);
            this.selectFromCollection = (collectionName) => this.dbInstance.selectFromCollection(collectionName);
            this.dropCollection = (collectionName) => this.dbInstance.dropCollection(collectionName);
            // Additional functions from documentFunctions and tableFunctions
            this.deleteFromTable = (tableName, id) => functions_2.tableFunctions.deleteRow(dbName, tableName, id);
            this.findInTable = (tableName, id) => functions_2.tableFunctions.getById(dbName, tableName, id);
            this.deleteFromCollection = (id) => functions_1.documentFunctions.deleteDocument(dbName, id);
            this.findInCollection = (id) => functions_1.documentFunctions.getById(dbName, id);
        }
        // Table functions
        createTable;
        insertIntoTable;
        selectFromTable;
        dropTable;
        // Collection functions
        createCollection;
        insertIntoCollection;
        selectFromCollection;
        dropCollection;
        // Additional functions from documentFunctions and tableFunctions
        deleteFromTable;
        findInTable;
        deleteFromCollection;
        findInCollection;
    }
    return new QueryFunctions(dbName);
}
//# sourceMappingURL=operations.js.map