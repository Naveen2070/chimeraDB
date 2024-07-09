import { ChimeraDB } from './chimera';
import * as fs from 'fs';
import * as path from 'path';
import { documentFunctions } from '../Documents/functions';
import { tableFunctions, TableRow } from '../Tables/functions';
import { Document } from '../Documents/Document';

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
function connect(dbName: string): ChimeraDB {
  // Resolve the file path of the database
  const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);

  // Check if the database exists
  if (fs.existsSync(filePath)) {
    // Create a new instance of ChimeraDB with the specified dbName
    return new ChimeraDB(dbName);
  } else {
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
function create(dbName: string): ChimeraDB {
  // Resolve the file path of the database
  const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);

  // Check if the database already exists
  if (fs.existsSync(filePath)) {
    // Throw an error if the database already exists
    throw new Error(`Database ${dbName}.cdb.db already exists.`);
  } else {
    // Create a new instance of ChimeraDB with the specified dbName
    return new ChimeraDB(dbName);
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
function queryFunction(dbName: string) {
  class QueryFunctions {
    dbInstance: ChimeraDB;

    constructor(dbName: string) {
      this.dbInstance = connect(dbName);

      // Table functions
      this.createTable = (tableName: string, columns: string[]) =>
        this.dbInstance.createTable(tableName, columns);
      this.insertIntoTable = (tableName: string, row: any) =>
        this.dbInstance.insertIntoTable(tableName, row);
      this.selectFromTable = (tableName: string) =>
        this.dbInstance.selectFromTable(tableName);
      this.dropTable = (tableName: string) =>
        this.dbInstance.dropTable(tableName);

      // Collection functions
      this.createCollection = (collectionName: string) =>
        this.dbInstance.createCollection(collectionName);
      this.insertIntoCollection = (collectionName: string, doc: any) =>
        this.dbInstance.insertIntoCollection(collectionName, doc);
      this.selectFromCollection = (collectionName: string) =>
        this.dbInstance.selectFromCollection(collectionName);
      this.dropCollection = (collectionName: string) =>
        this.dbInstance.dropCollection(collectionName);

      // Additional functions from documentFunctions and tableFunctions
      this.deleteFromTable = (tableName: string, id: number) =>
        tableFunctions.deleteRow(dbName, tableName, id);
      this.findInTable = (tableName: string, id: number) =>
        tableFunctions.getById(dbName, tableName, id);
      this.deleteFromCollection = (id: string) =>
        documentFunctions.deleteDocument(dbName, id);
      this.findInCollection = (id: string) =>
        documentFunctions.getById(dbName, id);
    }

    // Table functions
    createTable: (tableName: string, columns: string[]) => void;
    insertIntoTable: (tableName: string, row: any) => void;
    selectFromTable: (tableName: string, criteria: any) => any[];
    dropTable: (tableName: string) => void;

    // Collection functions
    createCollection: (collectionName: string) => void;
    insertIntoCollection: (collectionName: string, doc: any) => void;
    selectFromCollection: (collectionName: string, criteria: any) => any[];
    dropCollection: (collectionName: string) => void;

    // Additional functions from documentFunctions and tableFunctions
    deleteFromTable: (tableName: string, id: number) => boolean;
    findInTable: (tableName: string, id: number) => TableRow | undefined;
    deleteFromCollection: (id: string) => boolean;
    findInCollection: (id: string) => Document | undefined;
  }

  return new QueryFunctions(dbName);
}

export { connect, create, queryFunction };
