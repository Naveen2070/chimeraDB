import { ChimeraDB } from './chimera';
import { TableRow } from '../Tables/functions';
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
declare function connect(dbName: string): ChimeraDB;
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
declare function queryFunction(dbName: string): {
    dbInstance: ChimeraDB;
    createTable: (tableName: string, columns: string[]) => void;
    insertIntoTable: (tableName: string, row: any) => void;
    selectFromTable: (tableName: string, criteria: any) => any[];
    dropTable: (tableName: string) => void;
    createCollection: (collectionName: string) => void;
    insertIntoCollection: (collectionName: string, doc: any) => void;
    selectFromCollection: (collectionName: string, criteria: any) => any[];
    dropCollection: (collectionName: string) => void;
    deleteFromTable: (tableName: string, id: number) => boolean;
    findInTable: (tableName: string, id: number) => TableRow | undefined;
    deleteFromCollection: (id: string) => boolean;
    findInCollection: (id: string) => Document | undefined;
};
export { connect, create, queryFunction };
//# sourceMappingURL=operations.d.ts.map