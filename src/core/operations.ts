import { ChimeraDB } from './chimera';
import * as fs from 'fs';
import * as path from 'path';
import documentFunctions, {
  documentFunctionsType,
} from '../Documents/functions';
import tableFunctions, { tableFunctionsType } from '../Tables/functions';

/**
 * Connects to an existing ChimeraDB database.
 *
 * This function creates an instance of ChimeraDB with bound functions by connecting to an existing database.
 * It takes the name of the database as a parameter and checks if the specified database exists.
 * If the specified database exists, it creates a proxy with a handler that binds the dbName to all function calls.
 * This proxy is then returned as an instance of ChimeraDB with bound functions.
 *
 * @example
 * // Connect to an existing database
 * const db = connect('my_database');
 * // Use the bound functions
 * db.createTable('users', ['id', 'name', 'email']);
 * db.insertIntoTable('users', [1, 'John Doe', 'john@example.com']);
 *
 * @param {string} dbName - The name of the database to connect to.
 * @returns {ChimeraDB & documentFunctionsType & tableFunctionsType} An instance of ChimeraDB with bound functions.
 * @throws {Error} Throws an error if the specified database does not exist.
 */
function connect(
  dbName: string
): ChimeraDB & documentFunctionsType & tableFunctionsType {
  // Resolve the file path of the database
  const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);

  // Check if the database exists
  if (fs.existsSync(filePath)) {
    // Create a new instance of ChimeraDB with the specified dbName
    const dbInstance = new ChimeraDB(dbName);

    // Create a proxy handler that binds the dbName to all function calls
    const proxyHandler = {
      get(target: any, prop: string) {
        // If the property exists in the target object
        if (prop in target) {
          const value = target[prop];
          // If the value is a function, bind it to the target object
          if (typeof value === 'function') {
            return value.bind(target);
          }
          // Return the value as is
          return value;
        } else if (prop in documentFunctions || prop in tableFunctions) {
          // If the property exists in documentFunctions or tableFunctions, create a function that calls the corresponding function with the dbName and the provided arguments
          const func =
            (documentFunctions as any)[prop] || (tableFunctions as any)[prop];
          return (...args: any[]) => func(dbName, ...args);
        } else {
          // Throw an error if the property does not exist
          throw new Error(`Function ${prop} does not exist.`);
        }
      },
    };

    // Create a proxy of the combined dbInstance, documentFunctions, and tableFunctions objects with the proxy handler
    return new Proxy(
      { ...dbInstance, ...documentFunctions, ...tableFunctions },
      proxyHandler
    ) as ChimeraDB & typeof documentFunctions & typeof tableFunctions;
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

export { connect, create };
