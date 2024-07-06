import { ChimeraDB } from './chimera';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Connects to an existing ChimeraDB database.
 *
 * This function takes the name of the database as a parameter and returns an instance of ChimeraDB.
 * If the specified database does not exist, it throws an error.
 *
 * @example
 * // Connect to an existing database
 * const db = connect('my_database');
 *
 * @param {string} dbName - The name of the database to connect to.
 * @returns {ChimeraDB} An instance of ChimeraDB.
 * @throws {Error} Throws an error if the specified database does not exist.
 */
function connect(dbName: string): ChimeraDB {
  const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
  if (fs.existsSync(filePath)) {
    return new ChimeraDB(dbName);
  } else {
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
 *
 * @param {string} dbName - The name of the database to create.
 * @returns {ChimeraDB} An instance of ChimeraDB.
 * @throws {Error} Throws an error if the specified database already exists.
 */
function create(dbName: string): ChimeraDB {
  const filePath = path.resolve(process.cwd(), `${dbName}.cdb.db`);
  if (fs.existsSync(filePath)) {
    throw new Error(`Database ${dbName}.cdb.db already exists.`);
  } else {
    return new ChimeraDB(dbName);
  }
}

export { connect, create };
