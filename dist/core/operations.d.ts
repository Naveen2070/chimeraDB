import { ChimeraDB } from './chimera';
import { documentFunctionsType } from '../Documents/functions';
import { tableFunctionsType } from '../Tables/functions';
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
declare function connect(dbName: string): ChimeraDB & documentFunctionsType & tableFunctionsType;
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
declare function create(dbName: string): ChimeraDB;
export { connect, create };
//# sourceMappingURL=operations.d.ts.map